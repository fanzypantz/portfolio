import "server-only";
import { cookies } from "next/headers";

export const saveLobbyIdCookie = async (lobbyId: string) => {
  const cookieStore = await cookies();

  cookieStore.set("lobbyId", lobbyId, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
  });
};

export const getLobbyIdCookie = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("lobbyId")?.value;
};

export const removeLobbyIdCookie = async () => {
  console.log("Removing lobbyId cookie");

  const cookieStore = await cookies();

  cookieStore.delete("lobbyId");
};
