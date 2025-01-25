"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";
import { GameTypes } from ".prisma/client";

export const createGameAction = async (lobbyId: string, gameType: GameTypes) => {
  const user = await getSessionPayload();
  if (!user) {
    return;
  }

  return prisma.game.create({
    data: {
      type: gameType,
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
