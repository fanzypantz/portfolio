"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";
import { LobbyType } from "@lib/Constants/types";

export const getLobbyAction = async (lobbyId: string) => {
  // TODO abstract the method to a function,
  //  so we can use it directly on the server instead of having to call the action on the server
  const user = await getSessionPayload();
  if (!user) {
    return { error: "getLobbyAction: No user found" };
  }
  if (!lobbyId) {
    return { error: "getLobbyAction: No lobbyId found" };
  }

  console.log("lobbyId", lobbyId);

  const lobby: LobbyType | null = await prisma.lobby.findUnique({
    where: {
      id: lobbyId
    },
    include: {
      lobbyMembers: {
        include: {
          user: true
        }
      }
    }
  });

  if (!lobby) {
    return { error: "Failed to create lobby" };
  }

  delete (lobby as any).password;
  for (const member of lobby.lobbyMembers) {
    delete (member as any).user.password;
  }

  if (lobby.lobbyMembers.find((member) => member.userId === user.id)) {
    return { lobby };
  }

  return { error: "User not found in lobby" };
};
