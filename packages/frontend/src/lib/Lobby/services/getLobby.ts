import "server-only";
import { getSessionPayload } from "@lib/Auth/sessions";
import { LobbyType } from "@lib/Constants/types";
import prisma from "@db/prisma";

export const getLobby = async (lobbyId: string): Promise<{ error?: string; lobby?: LobbyType }> => {
  const user = await getSessionPayload();
  if (!user) {
    return { error: "No user found" };
  }
  if (!lobbyId) {
    return { error: "No lobbyId found" };
  }

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
