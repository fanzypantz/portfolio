"use server";

import { loginSchema } from "@components/Auth/schemas/loginSchema";
import prisma from "@db/prisma";
import { comparePassword } from "@lib/Auth/hashing";
import { createSession } from "@lib/Auth/sessions";

export const loginAction = async (email: string, password: string) => {
  const validatedData = loginSchema.safeParse({ password, email });
  if (!validatedData.success) {
    return { error: validatedData.error };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: validatedData.data.email || validatedData.data.username || ""
      }
    });

    if (!user || !user.password) {
      return { error: { message: "User not found" } };
    }

    if (!comparePassword(validatedData.data.password, user.password)) {
      return { error: { message: "Wrong password" } };
    }

    await createSession(user);
    return { user };
  } catch {
    return { error: { message: "User not found" } };
  }
};
