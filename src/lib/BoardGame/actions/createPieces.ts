"use server";

import { Prisma } from "@prisma/client";
import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";

export const createPiecesAction = async (gameId: string, pieces: Prisma.GamePieceCreateManyInput[]) => {
  const user = await getSessionPayload();
  if (!user) {
    return false;
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
      ownerId: user.id
    }
  });

  if (!game) {
    return false;
  }

  return prisma.gamePiece.createMany({
    data: pieces,
    skipDuplicates: true
  });
};
