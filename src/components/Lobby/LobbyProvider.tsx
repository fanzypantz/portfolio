"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createLobbyAction } from "@lib/Lobby/actions/createLobby";
import { joinLobbyAction } from "@lib/Lobby/actions/joinLobby";
import { getLobbyAction } from "@lib/Lobby/actions/getLobby";
import { UserContext } from "@components/Auth/UserProvider";
import { leaveLobbyAction } from "@lib/Lobby/actions/leaveLobby";
import { getUserProfileAction } from "@lib/Auth/actions/getUserProfile";
import { Lobby, User } from "@prisma/client";
import { LobbyType } from "@lib/Constants/types";

export enum LobbyStatus {
  None = "none",
  Create = "create",
  Join = "join"
}

export enum JoinStatus {
  None = "none",
  Creating = "creating",
  Join = "join",
  Joining = "joining",
  Joined = "joined",
  Leaving = "leaving",
  Failed = "failed"
}

export interface LobbyContextInterface {
  currentLobby: Lobby | null;
  players: User[];
  joinStatus: JoinStatus;
  lobbyStatus: LobbyStatus;
  createLobby: (name: string, password: string) => Promise<boolean>;
  joinLobby: (name: string, password: string) => Promise<boolean>;
  leaveLobby: () => void;
  setJoinStatus: (status: JoinStatus) => void;
  setLobbyStatus: (status: LobbyStatus) => void;
}

export const LobbyContext = createContext({} as LobbyContextInterface);

export const LobbyProvider = ({
  children,
  loadedLobby
}: {
  children: JSX.Element | JSX.Element[];
  loadedLobby: LobbyType | null;
}) => {
  const { user } = useContext(UserContext);
  const [currentLobby, setCurrentLobby] = useState<Lobby | null>(loadedLobby);
  const [joinStatus, setJoinStatus] = useState<JoinStatus>(JoinStatus.None);
  const [lobbyStatus, setLobbyStatus] = useState<LobbyStatus>(LobbyStatus.None);
  const [players, setPlayers] = useState<User[]>([]);

  useEffect(() => {
    let newLobby: LobbyType | null = loadedLobby;

    if (!newLobby) {
      fetchLobby().then((lobby) => {
        newLobby = lobby;
      });
    }

    if (newLobby) {
      setCurrentLobby(newLobby);
      setPlayers(newLobby.lobbyMembers.map((member) => member.user));
      setJoinStatus(JoinStatus.Joined);
    }
  }, [loadedLobby]);

  useEffect(() => {
    if (!currentLobby) return;

    console.log("Joining lobby channel", currentLobby.id);

    // const supabaseJoinChannel = supabaseBrowserClient
    //   .channel(`lobby:${currentLobby.id}`)
    //   .on(
    //     "postgres_changes",
    //     {
    //       event: "INSERT",
    //       schema: "public",
    //       table: "lobby_players",
    //       filter: `lobby_id=eq.${currentLobby.id}`
    //     },
    //     (payload) => handlePlayerJoined(payload)
    //   )
    //   .subscribe();
    //
    // const supabaseLeaveChannel = supabaseBrowserClient
    //   .channel(`lobby:${currentLobby.id}`)
    //   .on(
    //     "postgres_changes",
    //     {
    //       event: "DELETE",
    //       schema: "public",
    //       table: "lobby_players",
    //       filter: `lobby_id=eq.${currentLobby.id}`
    //     },
    //     (payload) => handlePlayerLeave(payload)
    //   )
    //   .subscribe();
    //
    // return () => {
    //   supabaseJoinChannel.unsubscribe();
    //   supabaseLeaveChannel.unsubscribe();
    // };
  }, [currentLobby]);

  const fetchLobby = async () => {
    const { error, lobby } = await getLobbyAction();

    if (error) {
      console.error(error);
      return null;
    }

    if (!lobby) {
      console.error("Lobby not found");
      return null;
    }

    return lobby;
  };

  const createLobby = async (name: string, password: string): Promise<boolean> => {
    setJoinStatus(JoinStatus.Creating);
    const { error, lobby } = await createLobbyAction(name, password);

    if (error) {
      setJoinStatus(JoinStatus.Failed);
      return false;
    }

    if (!lobby) {
      setJoinStatus(JoinStatus.Failed);
      return false;
    }

    setCurrentLobby(lobby);
    setPlayers(lobby.lobbyMembers.map((member) => member.user));
    setJoinStatus(JoinStatus.Joined);

    return true;
  };

  const joinLobby = async (name: string, password: string): Promise<boolean> => {
    // Find lobby by id
    setJoinStatus(JoinStatus.Joining);
    const lobby = await joinLobbyAction(name, password);

    if (!lobby) {
      console.error("Lobby not joined");
      setJoinStatus(JoinStatus.Failed);
      return false;
    }

    setCurrentLobby(lobby);
    setPlayers(lobby.lobbyMembers.map((member) => member.user));
    setJoinStatus(JoinStatus.Joined);
    return true;
  };

  const leaveLobby = async () => {
    setJoinStatus(JoinStatus.Leaving);
    const result = await leaveLobbyAction();
    if (!result) {
      console.error("Lobby not left");
      setJoinStatus(JoinStatus.Failed);
      return;
    }

    setCurrentLobby(null);
    setPlayers([]);
    setJoinStatus(JoinStatus.None);
  };

  // const handlePlayerJoined = async (payload: RealtimePostgresInsertPayload<{ [p: string]: any }>) => {
  //   const player = payload.new as Tables<"lobby_players">;
  //
  //   console.log(player);
  //   await addPlayer(player.player_id);
  // };
  //
  // const handlePlayerLeave = (payload: RealtimePostgresDeletePayload<{ [p: string]: any }>) => {
  //   const lobby_player = payload.new as Tables<"lobby_players">;
  //
  //   console.log(lobby_player);
  //   removePlayer(lobby_player.player_id);
  // };

  const addPlayer = async (profile_id: string) => {
    const user = await getUserProfileAction(profile_id);
    console.log("Adding player", profile_id, user);

    if (!user) {
      console.error("No profile");
      return;
    }

    setPlayers([...players, user]);
  };

  const removePlayer = (profile_id: string) => {
    console.log("Removing player", profile_id);

    setPlayers([...players.filter((p) => p.id !== profile_id)]);
  };

  return (
    <LobbyContext.Provider
      value={{
        currentLobby,
        players,
        joinStatus,
        lobbyStatus,
        createLobby,
        joinLobby,
        leaveLobby,
        setJoinStatus,
        setLobbyStatus
      }}
    >
      {children}
    </LobbyContext.Provider>
  );
};
