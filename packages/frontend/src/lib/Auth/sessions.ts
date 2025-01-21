import "server-only";

import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { User } from "@prisma/client";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export type UserSession = User & JWTPayload;

export const encrypt = (payload: User) => {
  payload.password = null; // Make sure to remove the password from the payload

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

export const decrypt = async (token: string) => {
  try {
    const { payload } = await jwtVerify<UserSession>(token, encodedKey, {
      algorithms: ["HS256"]
    });

    payload.password = null; // Make sure to remove the password from the payload
    return payload;
  } catch {
    console.error("Failed to verify session");
  }
};

export const getSessionToken = async () => {
  const session = (await cookies()).get("session");
  if (!session) {
    return "";
  }

  return session.value;
};

export const getSessionPayload = async () => {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return null;
  }

  return decrypt(sessionToken);
};

export const createSession = async (payload: User) => {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
  const token = await encrypt(payload);

  console.log("Creating session", payload, token);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  });
};

export const updateSession = async (newPayload?: User) => {
  const sessionToken = await getSessionToken();
  const payload = newPayload || (await decrypt(sessionToken));

  if (!sessionToken || !payload) {
    return;
  }

  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

  (await cookies()).set("session", await encrypt(payload), {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  });
};

export const destroySession = async () => {
  (await cookies()).delete("session");
  (await cookies()).delete("jwt");
  (await cookies()).delete("cartState");
};
