"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";

export const getLobbyMessagesAction = async (lobbyId: string) => {
  const user = await getSessionPayload();
  if (!user) {
    return { error: "getLobbyMessagesAction:No user found" };
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
