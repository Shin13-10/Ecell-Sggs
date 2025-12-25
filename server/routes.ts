import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Events routes - Public Read Only
  app.get("/api/events", async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get("/api/events/:id", async (req, res) => {
    const event = await storage.getEvent(parseInt(req.params.id));
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  });

  // Team routes - Public Read Only
  app.get("/api/team", async (req, res) => {
    const team = await storage.getTeamMembers();
    res.json(team);
  });

  app.get("/api/team/:id", async (req, res) => {
    const member = await storage.getTeamMember(parseInt(req.params.id));
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.json(member);
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contact = insertContactSchema.parse(req.body);
      const result = await storage.createContact(contact);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact form data" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletter = insertNewsletterSchema.parse(req.body);
      const result = await storage.subscribeNewsletter(newsletter);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Invalid newsletter data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
