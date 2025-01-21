import { Lobby, LobbyMember, User } from "@prisma/client";

export type LobbyType = Lobby & {
  password?: string | null;
  lobbyMembers: LobbyMemberType[];
};

export type LobbyMemberType = LobbyMember & {
  user: User;
};

export type UserType = User & {
  password?: string | null;
};

export type ChatMessageType = {
  id: string;
  message: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
  };
};
