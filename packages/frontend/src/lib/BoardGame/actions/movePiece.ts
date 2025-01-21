"use server";

import { Vector2 } from "@lib/BoardGame/Position";
import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";

export const movePieceAction = async (gameId: string, pieceId: number, from: Vector2, to: Vector2) => {
  const user = await getSessionPayload();
  if (!user) {
    return;
  }

  // TODO make a function to verify if the user is in the game
  const game = await prisma.game.findUnique({
    where: {
      id: gameId
    },
    include: {
      pieces: true,
      lobby: {
        include: {
          lobbyMembers: true
        }
      }
    }
  });

  if (!game) {
    return;
  }

  const gameMove = await prisma.gameMove.create({
    data: {
      user: {
        connect: {
          id: user.id
        }
      },
      piece: {
        connect: {
          id: pieceId
        }
      },
      xStart: from.x,
      yStart: from.y,
      xEnd: to.x,
      yEnd: to.y
    }
  });

  if (!gameMove) {
    return;
  }

  return gameMove;
};
