"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";
import { cookies } from "next/headers";
import { removeLobbyIdCookie } from "@lib/Lobby/lobbyStorage";

export const leaveLobbyAction = async (): Promise<boolean> => {
  const user = await getSessionPayload();
  if (!user || !user.id) {
    return false;
  }

  const lobbyId = (await cookies()).get("lobbyId")?.value;
  if (!lobbyId) {
    return false;
  }

  const lobby = await prisma.lobby.findUnique({
    where: {
      id: lobbyId
    },
    include: {
      lobbyMembers: true
    }
  });

  if (!lobby) {
    return false;
  }

  if (lobby.lobbyMembers.find((member) => member.userId === user.id)) {
    const result = await prisma.lobbyMember.deleteMany({
      where: {
        lobbyId: lobby.id,
        userId: user.id
      }
    });

    if (!result) {
      return false;
    }
  }

  // Remove cookie
  removeLobbyIdCookie();

  return true;
};
