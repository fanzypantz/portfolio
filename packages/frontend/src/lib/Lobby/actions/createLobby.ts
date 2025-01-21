"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import { hashPassword } from "@lib/Auth/hashing";
import prisma from "@db/prisma";
import { LobbyType } from "@lib/Constants/types";
import { saveLobbyIdCookie } from "@lib/Lobby/lobbyStorage";

export const createLobbyAction = async (name: string, password: string) => {
  const user = await getSessionPayload();
  if (!user) {
    return { error: ":createLobbyAction No user found" };
  }

  const hashedPassword = hashPassword(password);

  const lobby: LobbyType = await prisma.lobby.create({
    data: {
      name: name,
      password: hashedPassword,
      lobbyMembers: {
        create: {
          user: {
            connect: {
              id: user.id
            }
          }
        }
      }
    },
    include: {
      lobbyMembers: {
        include: {
          user: true
        }
      }
    }
  });

  if (!lobby) {
    return { error: "Failed to create lobby" };
  }

  // Save lobby ID to cookie as secure https-only cookie
  saveLobbyIdCookie(lobby.id.toString());

  delete (lobby as any).password;
  for (const member of lobby.lobbyMembers) {
    delete (member as any).user.password;
  }

  return { lobby };
};
