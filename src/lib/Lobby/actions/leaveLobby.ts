"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";
import { cookies } from "next/headers";

export const leaveLobbyAction = async (): Promise<boolean> => {
  const user = await getSessionPayload();
  if (!user) {
    return false;
  }

  const lobbyId = cookies().get("lobbyId")?.value;
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
    const result = await prisma.lobby.update({
      where: {
        id: lobby.id
      },
      data: {
        lobbyMembers: {
          delete: {
            userId: user.id
          }
        }
      }
    });

    if (!result) {
      return false;
    }
  }

  // Remove cookie
  cookies().delete("lobbyId");

  return true;
};
