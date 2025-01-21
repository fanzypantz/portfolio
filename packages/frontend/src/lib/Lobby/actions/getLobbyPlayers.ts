"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";

export const getLobbyPlayersAction = async (lobbyId: string) => {
  const user = await getSessionPayload();
  if (!user) {
    return;
  }

  const lobbyPlayers = await prisma.lobby.findUnique({
    where: {
      id: lobbyId
    },
    include: {
      lobbyMembers: true
    }
  });

  if (!lobbyPlayers) {
    return;
  }

  if (lobbyPlayers.lobbyMembers.find((member) => member.userId === user.id)) {
    return lobbyPlayers.lobbyMembers;
  }
};
