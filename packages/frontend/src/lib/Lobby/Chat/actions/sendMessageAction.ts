"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";
import { ChatMessageType } from "@lib/Constants/types";

export const sendMessageAction = async (lobbyId: string, message: ChatMessageType) => {
  const user = await getSessionPayload();
  if (!user) {
    return { error: "No user found" };
  }

  const messages = await prisma.chatMessage.create({
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
      message: message.message
    }
  });

  if (!messages) {
    return { error: "Failed to create chat message" };
  }

  return { messages };
};
