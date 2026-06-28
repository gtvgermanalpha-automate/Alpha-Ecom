import { z } from "zod";

/** Shared contact form schema — used by the client form and the API route. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "That name is a little too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "That number is too long")
    .regex(/^[0-9+()\-.\s]+$/, "Use digits and + ( ) - only"),
  company: z.string().trim().max(80).optional().or(z.literal("")),
  interest: z.string().min(1, "Please choose a service"),
  budget: z.string().min(1, "Please choose a budget range"),
  source: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please add a few more details (10+ characters)")
    .max(2000, "Please keep it under 2000 characters"),
  nda: z.boolean().optional().default(false),
});

export type ContactValues = z.infer<typeof contactSchema>;

/** Client-side constraints for the optional file attachment. */
export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const ACCEPTED_FILE_EXT = ".pdf,.doc,.docx";
