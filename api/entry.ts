import { createApp } from "../server/app";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const app = await createApp();
        app(req, res);
    } catch (err: any) {
        console.error("API Error:", err);
        res.status(500).json({
            error: "Internal API Error",
            message: err.message,
            stack: err.stack
        });
    }
}
