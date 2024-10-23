import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().optional(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  password: z.string()
});
