"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import prisma from "@db/prisma";
import { cookies } from "next/headers";

export const getLobbyAction = async () => {
  const user = await getSessionPayload();
  if (!user) {
    return;
  }

  const lobbyId = cookies().get("lobbyId")?.value;
  if (!lobbyId) {
    return;
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
    return;
  }

  if (lobby.lobbyMembers.find((member) => member.userId === user.id)) {
    return lobby;
  }
};
