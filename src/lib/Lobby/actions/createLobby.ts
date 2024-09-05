"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import { hashPassword } from "@lib/Auth/hashing";
import prisma from "@db/prisma";

export const createLobbyAction = async (name: string, password: string) => {
  const user = await getSessionPayload();
  if (!user) {
    return;
  }

  const hashedPassword = hashPassword(password);

  const lobby = await prisma.lobby.create({
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
    return;
  }

  lobby.password = null;

  return lobby;
};
