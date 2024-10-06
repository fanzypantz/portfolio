import "server-only";
import { cookies } from "next/headers";

export const saveLobbyId = (lobbyId: string) => {
  cookies().set("lobbyId", lobbyId, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
  });
};

export const getLobbyId = (): string | null => {
  return cookies().get("lobbyId")?.value ?? null;
};

export const removeLobbyId = () => {
  cookies().delete("lobbyId");
};
