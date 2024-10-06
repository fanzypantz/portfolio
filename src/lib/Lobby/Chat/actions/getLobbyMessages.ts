"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";
import { getLobbyId } from "@lib/Lobby/lobbyStorage";

export const getLobbyMessagesAction = async () => {
  const user = await getSessionPayload();
  if (!user) {
    return { error: "No user found" };
  }

  const lobbyId = getLobbyId();
  if (!lobbyId) {
    return { error: "No lobbyId found" };
  }

  const messages = await prisma.chatMessage.findMany({
    where: {
      lobbyId: lobbyId
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

  if (!messages) {
    return { error: "Failed to create chat message" };
  }

  return { messages };
};
