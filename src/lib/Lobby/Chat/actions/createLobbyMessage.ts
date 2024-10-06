"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";
import { getLobbyId } from "@lib/Lobby/lobbyStorage";

export const createLobbyMessageAction = async (message: string) => {
  const user = await getSessionPayload();
  if (!user) {
    return { error: "No user found" };
  }

  const lobbyId = getLobbyId();
  if (!lobbyId) {
    return { error: "No lobbyId found" };
  }

  const chatMessage = await prisma.chatMessage.create({
    data: {
      user: {
        connect: {
          id: user.id
        }
      },
      lobby: {
        connect: {
          id: lobbyId
        }
      },
      message: message
    },
    select: {
      id: true,
      message: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true
        }
      }
    }
  });

  if (!chatMessage) {
    return { error: "Failed to create chat message" };
  }

  return { chatMessage };
};
