"use server";

import prisma from "@db/prisma";
import { GameStatus } from "@prisma/client";
import { getSessionPayload } from "@lib/Auth/sessions";

export const closeGameAction = async (gameId: string) => {
  const user = await getSessionPayload();
  if (!user) {
    return false;
  }

  return prisma.game.update({
    where: {
      id: gameId,
      ownerId: user.id
    },
    data: {
      finishedAt: new Date().toISOString(),
      status: GameStatus.finished
    }
  });
};
