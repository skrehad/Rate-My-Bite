import { z } from "zod";
export const loginSchema = z.object({
  email: z.string({ required_error: "Email or phone required" }),
  password: z
    .string({ required_error: "Password required" })
    .min(6, "Password must be at least 6 characters"),
});
export const registrationSchema = z.object({
  fullName: z
    .string({ required_error: "Name required" })
    .min(3, "Name must be at least 3 characters"),
  email: z.string({ required_error: "Email required" }).email("Invalid email"),

  password: z
    .string({ required_error: "Password required" })
    .min(6, "Password must be at least 6 characters"),
});
