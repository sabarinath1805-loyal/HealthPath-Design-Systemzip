import {
  pgTable,
  pgEnum,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const caseStatusEnum = pgEnum("case_status", [
  "open",
  "waiting",
  "closed",
]);
export const messageRoleEnum = pgEnum("message_role", ["user", "assistant"]);
export const messageKindEnum = pgEnum("message_kind", [
  "text",
  "document",
  "escalation",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull().default("New case"),
  status: caseStatusEnum("status").notNull().default("open"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  caseId: integer("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  role: messageRoleEnum("role").notNull(),
  text: text("text"),
  kind: messageKindEnum("kind").notNull().default("text"),
  data: jsonb("data"), // card-specific payload
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  cases: many(cases),
}));

export const casesRelations = relations(cases, ({ one, many }) => ({
  user: one(users, { fields: [cases.userId], references: [users.id] }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  case: one(cases, { fields: [messages.caseId], references: [cases.id] }),
}));

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email("Enter a valid email."),
  name: z.string().min(1, "Tell me what to call you."),
  password: z.string().min(8, "Use at least 8 characters."),
}).pick({ email: true, name: true, password: true });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Case = typeof cases.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;
