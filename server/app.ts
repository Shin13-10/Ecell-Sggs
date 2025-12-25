import express from "express";
import { registerRoutes } from "./routes";
import { storage } from "./storage";
import path from 'path';

export async function createApp() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Serve files from the uploads directory
    app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        next();
    });

    // Logging middleware
    app.use((req, res, next) => {
        const start = Date.now();
        const path = req.path;
        let capturedJsonResponse: Record<string, any> | undefined = undefined;

        const originalResJson = res.json;
        res.json = function (bodyJson, ...args) {
            capturedJsonResponse = bodyJson;
            return originalResJson.apply(res, [bodyJson, ...args]);
        };

        res.on("finish", () => {
            const duration = Date.now() - start;
            if (path.startsWith("/api")) {
                let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
                if (capturedJsonResponse) {
                    logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
                }

                if (logLine.length > 80) {
                    logLine = logLine.slice(0, 79) + "…";
                }

                console.log(logLine);
            }
        });

        next();
    });

    // Register routes
    await registerRoutes(app);

    return app;
}
