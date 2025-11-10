import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const studentProfileSchema = z.object({
  linkedinUrl: z.string().url(),
  currentCity: z.string().min(2),
  targetDegree: z.string().min(2),
  targetCountry: z.string().min(2),
});

export type StudentProfile = z.infer<typeof studentProfileSchema>;

export const alumniSchema = z.object({
  id: z.string(),
  name: z.string(),
  photoUrl: z.string(),
  degree: z.string(),
  university: z.string(),
  country: z.string(),
  currentRole: z.string(),
  currentCompany: z.string(),
  preStudyRole: z.string(),
  preStudyCompany: z.string(),
  preStudyCity: z.string(),
  skills: z.array(z.string()),
  yearsOfExperience: z.number(),
  extracurriculars: z.array(z.string()),
  linkedinUrl: z.string().url(),
  twitterUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  matchScore: z.number(),
  skillsMatch: z.number(),
  experienceMatch: z.number(),
  cityMatch: z.number(),
  extracurricularsMatch: z.number(),
  educationMatch: z.number(),
});

export type Alumni = z.infer<typeof alumniSchema>;
