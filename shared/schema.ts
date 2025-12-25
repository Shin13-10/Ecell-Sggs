import { pgTable, text, serial, integer, boolean, timestamp, primaryKey, uuid, json, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Events
export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  imageUrl: text("image_url").notNull(),
  venue: text("venue").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull(), // 'upcoming' | 'completed'
  registerLink: text("register_link"), // Optional link for registration
  participants: text("participants"), // Optional stats like "50 Attendees"
  capacity: integer("capacity"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Team Members
export const team = pgTable("team", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  email: text("email").notNull(),
  linkedin: text("linkedin"),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  order: integer("order"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Contact and Newsletter
export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const newsletters = pgTable("newsletters", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod Schemas for Input Validation
export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true, updatedAt: true });
export const insertTeamSchema = createInsertSchema(team).omit({ id: true, createdAt: true, updatedAt: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true, status: true, createdAt: true, updatedAt: true });
export const insertNewsletterSchema = createInsertSchema(newsletters).omit({ id: true, status: true, createdAt: true });

// Types
export type Event = typeof events.$inferSelect;
export type Team = typeof team.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type Newsletter = typeof newsletters.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
