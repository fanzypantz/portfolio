"use server";

import { registerSchema } from "@components/Auth/schemas/registerSchema";
import { hashPassword } from "@lib/Auth/hashing";
import prisma from "@db/prisma";
import { createSession } from "@lib/Auth/sessions";

export const signUpAction = async (username: string, email: string, password: string) => {
  const validatedData = registerSchema.safeParse({ username, email, password });
  if (!validatedData.success) {
    return { error: validatedData.error };
  }

  const passwordHash = hashPassword(validatedData.data.password);
  if (!passwordHash) {
    return { error: { message: "Password hashing failed" } };
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: validatedData.data.email,
        username: validatedData.data.username || validatedData.data.email || "",
        password: passwordHash
      }
    });

    if (!user) {
      return { error: { message: "User creation failed" } };
    }

    await createSession(user);

    return { user };
  } catch {
    return { error: { message: "User creation failed" } };
  }
};
