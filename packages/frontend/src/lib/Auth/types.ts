import { User } from "@prisma/client";
import { JWTPayload } from "jose";

export type UserSession = User & JWTPayload;

export type UserType = User & {
  password?: string | null;
};
