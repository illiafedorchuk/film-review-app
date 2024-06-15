// validationSchema.ts
import { z } from "zod";

export const schema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormFields = z.infer<typeof schema>;
