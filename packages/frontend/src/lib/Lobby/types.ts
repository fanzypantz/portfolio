import { Lobby, LobbyMember, User } from "@prisma/client";

export type LobbyType = Lobby & {
  password?: string | null;
  lobbyMembers: LobbyMemberType[];
};

export type LobbyMemberType = LobbyMember & {
  user: User;
};
