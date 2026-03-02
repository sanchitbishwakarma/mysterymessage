import { z } from "zod"

export const usernameValidation = z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be no more than 16 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, { message: "password must be at least 6 characters" })
})  