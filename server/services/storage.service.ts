import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import sharp from "sharp";
import { db } from "../db";
import { files, type File } from "@shared/schema";
import { eq } from "drizzle-orm";
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Check if AWS credentials are provided
const useS3 = process.env.AWS_ACCESS_KEY_ID && 
              process.env.AWS_SECRET_ACCESS_KEY && 
              process.env.AWS_REGION &&
              process.env.AWS_BUCKET_NAME &&
              process.env.AWS_ACCESS_KEY_ID !== "your-access-key" &&
              process.env.AWS_SECRET_ACCESS_KEY !== "your-secret-key";

// Initialize S3 client if credentials are provided
let s3Client: S3Client | null = null;
let BUCKET_NAME = '';

if (useS3) {
  try {
    s3Client = new S3Client({
      region: process.env.AWS_REGION || "",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
    BUCKET_NAME = process.env.AWS_BUCKET_NAME || "";
    console.log("AWS S3 client initialized successfully");
  } catch (error) {
    console.error("Failed to initialize AWS S3 client:", error);
    console.log("Using local file storage as fallback");
  }
} else {
  console.log("AWS S3 credentials not provided, using local file storage");
}

// Ensure local uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export class StorageService {
  static async uploadFile(
    buffer: Buffer,
    originalname: string,
    mimetype: string,
    size: number,
    uploadedBy?: string
  ): Promise<File> {
    const timestamp = Date.now();
    const filename = `${timestamp}-${originalname.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    
    // Determine file type
    let fileType: "image" | "document" | "video" | "other" = "other";
    if (mimetype.startsWith("image/")) fileType = "image";
    else if (mimetype.startsWith("video/")) fileType = "video";
    else if (mimetype.startsWith("application/")) fileType = "document";

    // Process images
    let processedBuffer = buffer;
    if (fileType === "image") {
      processedBuffer = await sharp(buffer)
        .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();
    }

    let fileUrl = '';

    // Upload to S3 if available, otherwise save locally
    if (s3Client && BUCKET_NAME) {
      await s3Client.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: processedBuffer,
        ContentType: mimetype,
      }));
      fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${filename}`;
    } else {
      // Save to local filesystem
      const filePath = path.join(UPLOADS_DIR, filename);
      await fs.promises.writeFile(filePath, processedBuffer);
      fileUrl = `/uploads/${filename}`;
    }

    // Save file record to database
    const [file] = await db.insert(files).values({
      name: originalname,
      type: fileType,
      url: fileUrl,
      size,
      metadata: {
        mimetype,
        originalname,
        isLocal: !useS3,
      },
      uploadedBy,
    }).returning();

    return file;
  }

  static async getSignedDownloadUrl(fileId: string): Promise<string> {
    const [file] = await db.select().from(files).where(eq(files.id, fileId));
    
    if (!file) {
      throw new Error("File not found");
    }

    // If using local storage, return the local URL
    if (file.metadata && typeof file.metadata === 'object' && 'isLocal' in file.metadata && file.metadata.isLocal) {
      return file.url;
    }

    // If using S3, generate a signed URL
    if (s3Client && BUCKET_NAME) {
      const filename = file.url.split("/").pop();
      if (!filename) {
        throw new Error("Invalid file URL");
      }

      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filename,
      });

      return getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
    }

    // Fallback to direct URL
    return file.url;
  }

  static async deleteFile(fileId: string): Promise<boolean> {
    const [file] = await db.select().from(files).where(eq(files.id, fileId));
    
    if (!file) {
      return false;
    }

    // Check if file is stored locally
    if (file.metadata && typeof file.metadata === 'object' && 'isLocal' in file.metadata && file.metadata.isLocal) {
      const filename = file.url.split("/").pop();
      if (filename) {
        const filePath = path.join(UPLOADS_DIR, filename);
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      }
    } else if (s3Client && BUCKET_NAME) {
      // Delete from S3
      const filename = file.url.split("/").pop();
      if (!filename) {
        throw new Error("Invalid file URL");
      }

      await s3Client.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: filename,
      }));
    }

    // Delete from database
    await db.delete(files).where(eq(files.id, fileId));

    return true;
  }

  static async getFiles(type?: "image" | "document" | "video" | "other"): Promise<File[]> {
    if (type) {
      return db.select().from(files).where(eq(files.type, type));
    }
    return db.select().from(files);
  }
} 