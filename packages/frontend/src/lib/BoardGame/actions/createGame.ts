"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";

export const createGameAction = async (lobbyId: string) => {
  const user = await getSessionPayload();
  if (!user) {
    return;
  }

  return prisma.game.create({
    data: {
      lobby: {
        connect: {
          id: lobbyId
        }
      },
      owner: {
        connect: {
          id: user.id
        }
      },
      status: "waiting"
    }
  });
};
