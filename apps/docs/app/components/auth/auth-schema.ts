import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),

  email: z.string().email("Please enter a valid email"),

  phone: z.string().min(10, "Phone number must be at least 10 digits"),

  experience: z.string().min(1, "Please select experience"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signinSchema = z.object({
  email: z.string().email("Please enter a valid email"),

  password: z.string().min(1, "Password is required"),
});

export type SignUpFormValues = z.infer<typeof signupSchema>;

export type SignInFormValues = z.infer<typeof signinSchema>;
