import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { users, sessions, type User } from "@shared/schema";
import { Redis } from "@upstash/redis";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const SALT_ROUNDS = 10;

// Initialize Redis client if URLs are provided, otherwise use a simple in-memory cache
let redis: Redis | null = null;
const memoryCache = new Map<string, string>();

if (process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN && 
    process.env.UPSTASH_REDIS_URL !== "your-redis-url" && 
    process.env.UPSTASH_REDIS_TOKEN !== "your-redis-token") {
  try {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN,
    });
    console.log("Redis connected successfully");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    console.log("Using in-memory cache as fallback");
  }
} else {
  console.log("Redis configuration not provided, using in-memory cache");
}

// Cache helper functions
async function cacheSet(key: string, value: string, expirySeconds?: number): Promise<void> {
  if (redis) {
    await redis.set(key, value, expirySeconds ? { ex: expirySeconds } : undefined);
  } else {
    memoryCache.set(key, value);
    if (expirySeconds) {
      setTimeout(() => memoryCache.delete(key), expirySeconds * 1000);
    }
  }
}

async function cacheGet(key: string): Promise<string | null> {
  if (redis) {
    return redis.get<string>(key);
  } else {
    return memoryCache.get(key) || null;
  }
}

async function cacheDel(key: string): Promise<void> {
  if (redis) {
    await redis.del(key);
  } else {
    memoryCache.delete(key);
  }
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  }

  static async createUser(email: string, password: string, name: string, role: "admin" | "member" | "moderator" = "member"): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    const [user] = await db.insert(users).values({
      email,
      hashedPassword,
      name,
      role,
    }).returning();
    return user;
  }

  static async createSession(userId: string): Promise<string> {
    const token = this.generateToken(userId);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await db.insert(sessions).values({
      userId,
      token,
      expiresAt,
    });

    // Cache the session for faster lookups
    await cacheSet(`session:${token}`, userId, 7 * 24 * 60 * 60); // 7 days

    return token;
  }

  static async validateSession(token: string): Promise<User | null> {
    try {
      // Try to get the userId from cache first
      const cachedUserId = await cacheGet(`session:${token}`);
      
      if (cachedUserId) {
        const [user] = await db.select().from(users).where(eq(users.id, cachedUserId));
        return user || null;
      }

      // If not in cache, verify the token and check the database
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const [session] = await db.select()
        .from(sessions)
        .where(eq(sessions.token, token))
        .where(eq(sessions.userId, decoded.userId));

      if (!session || new Date(session.expiresAt) < new Date()) {
        return null;
      }

      const [user] = await db.select().from(users).where(eq(users.id, session.userId));
      
      if (user) {
        // Cache the valid session
        await cacheSet(`session:${token}`, user.id, 7 * 24 * 60 * 60);
      }

      return user || null;
    } catch (error) {
      return null;
    }
  }

  static async invalidateSession(token: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.token, token));
    await cacheDel(`session:${token}`);
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || null;
  }

  static async findUserById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || null;
  }

  static async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    if (data.hashedPassword) {
      data.hashedPassword = await this.hashPassword(data.hashedPassword);
    }

    const [user] = await db.update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    
    return user || null;
  }

  static async deleteUser(id: string): Promise<boolean> {
    const [user] = await db.delete(users)
      .where(eq(users.id, id))
      .returning();
    
    return !!user;
  }
} 