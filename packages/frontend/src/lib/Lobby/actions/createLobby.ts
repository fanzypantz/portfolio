"use server";

import { getSessionPayload } from "@lib/Auth/sessions";
import { hashPassword } from "@lib/Auth/hashing";
import prisma from "@db/prisma";
import { saveLobbyIdCookie } from "@lib/Lobby/lobbyStorage";
import { LobbyType } from "@lib/Lobby/types";

export const createLobbyAction = async (name: string, password: string) => {
  console.log("createLobbyAction");
  console.log(name, password);

  try {
    const user = await getSessionPayload();
    if (!user) {
      return { error: ":createLobbyAction No user found" };
    }

    const hashedPassword = hashPassword(password);

    console.log(
      JSON.stringify({
        data: {
          name: name,
          password: hashedPassword,
          lobbyMembers: {
            create: {
              user: {
                connect: {
                  id: user.id
                }
              }
            }
          }
        },
        include: {
          lobbyMembers: {
            include: {
              user: true
            }
          }
        }
      })
    );

    const lobby: LobbyType = await prisma.lobby.create({
      data: {
        name: name,
        password: hashedPassword,
        lobbyMembers: {
          create: {
            user: {
              connect: {
                id: user.id
              }
            }
          }
        }
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

    console.log(lobby);

    // Save lobby ID to cookie as secure https-only cookie
    await saveLobbyIdCookie(lobby.id.toString());

    delete (lobby as any).password;
    for (const member of lobby.lobbyMembers) {
      delete (member as any).user.password;
    }

    return { lobby };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
};
