import session from "express-session";
import connectPg from "connect-pg-simple";
import { eq, desc, and } from "drizzle-orm";
import { db, pool } from "./db";
import {
  users,
  cases,
  messages,
  type User,
  type InsertUser,
  type Case,
  type Message,
  type InsertMessage,
} from "@shared/schema";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  sessionStore: session.Store;

  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getCases(userId: number): Promise<Case[]>;
  getCase(id: number, userId: number): Promise<Case | undefined>;
  createCase(userId: number, title: string): Promise<Case>;
  updateCase(
    id: number,
    userId: number,
    patch: Partial<Pick<Case, "title" | "status">>,
  ): Promise<Case | undefined>;
  touchCase(id: number): Promise<void>;
  deleteCase(id: number, userId: number): Promise<void>;

  getMessages(caseId: number): Promise<Message[]>;
  addMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({ ...insertUser, email: insertUser.email.toLowerCase() })
      .returning();
    return user;
  }

  async getCases(userId: number): Promise<Case[]> {
    return db
      .select()
      .from(cases)
      .where(eq(cases.userId, userId))
      .orderBy(desc(cases.updatedAt));
  }

  async getCase(id: number, userId: number): Promise<Case | undefined> {
    const [c] = await db
      .select()
      .from(cases)
      .where(and(eq(cases.id, id), eq(cases.userId, userId)));
    return c || undefined;
  }

  async createCase(userId: number, title: string): Promise<Case> {
    const [c] = await db
      .insert(cases)
      .values({ userId, title })
      .returning();
    return c;
  }

  async updateCase(
    id: number,
    userId: number,
    patch: Partial<Pick<Case, "title" | "status">>,
  ): Promise<Case | undefined> {
    const [c] = await db
      .update(cases)
      .set({ ...patch, updatedAt: new Date() })
      .where(and(eq(cases.id, id), eq(cases.userId, userId)))
      .returning();
    return c || undefined;
  }

  async touchCase(id: number): Promise<void> {
    await db
      .update(cases)
      .set({ updatedAt: new Date() })
      .where(eq(cases.id, id));
  }

  async deleteCase(id: number, userId: number): Promise<void> {
    await db.delete(cases).where(and(eq(cases.id, id), eq(cases.userId, userId)));
  }

  async getMessages(caseId: number): Promise<Message[]> {
    return db
      .select()
      .from(messages)
      .where(eq(messages.caseId, caseId))
      .orderBy(messages.id);
  }

  async addMessage(message: InsertMessage): Promise<Message> {
    const [m] = await db.insert(messages).values(message).returning();
    return m;
  }
}

export const storage = new DatabaseStorage();
