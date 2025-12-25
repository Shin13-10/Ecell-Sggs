import 'dotenv/config';
import { createApp } from "./app";
import { setupVite, serveStatic, log } from "./vite";
import { createServer } from "http";

(async () => {
  const app = await createApp();
  const server = createServer(app);

  app.use((err: any, _req: any, res: any, _next: any) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    //reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
