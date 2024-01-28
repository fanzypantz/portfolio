"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Database, Tables } from "@supabase/database.types";
import { createLobbyAction } from "@components/Lobby/actions/createLobby";
import { joinLobbyAction } from "@components/Lobby/actions/joinLobby";
import { getLobbyAction } from "@components/Lobby/actions/getLobby";
import { UserContext } from "@components/Auth/UserProvider";
import { leaveLobbyAction } from "@components/Lobby/actions/leaveLobby";
import { supabaseBrowserClient } from "@lib/Auth/supabase";
import { RealtimePostgresDeletePayload, RealtimePostgresInsertPayload } from "@supabase/realtime-js";
import { getUserProfileAction } from "@components/Auth/actions/getUserProfile";
import { getLobbyPlayersAction } from "@components/Lobby/actions/getLobbyPlayers";

export enum LobbyStatus {
  None = "none",
  Create = "create",
  Join = "join",
  Joining = "joining",
  Joined = "joined"
}

export interface LobbyContextInterface {
  currentLobby: Tables<"lobbies"> | null;
  lobbyStatus: LobbyStatus;
  players: Tables<"profiles">[];
  createLobby: (name: string, password: string) => Promise<boolean>;
  joinLobby: (name: string, password: string) => Promise<boolean>;
  leaveLobby: () => void;
  setLobbyStatus: (status: LobbyStatus) => void;
}

export const LobbyContext = createContext({} as LobbyContextInterface);

export const LobbyProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { profile } = useContext(UserContext);
  const [currentLobby, setCurrentLobby] = useState<Tables<"lobbies"> | null>(null);
  const [lobbyStatus, setLobbyStatus] = useState<LobbyStatus>(LobbyStatus.None);
  const [players, setPlayers] = useState<Tables<"profiles">[]>([]);

  useEffect(() => {
    const lobbyId = localStorage.getItem("lobbyId");
    if (!lobbyId) return;

    fetchLobby(parseInt(lobbyId));
  }, []);

  useEffect(() => {
    if (!currentLobby) return;

    console.log("Joining lobby channel", currentLobby.id);

    const supabaseJoinChannel = supabaseBrowserClient
      .channel(`lobby:${currentLobby.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "lobby_players",
          filter: `lobby_id=eq.${currentLobby.id}`
        },
        (payload) => handlePlayerJoined(payload)
      )
      .subscribe();

    const supabaseLeaveChannel = supabaseBrowserClient
      .channel(`lobby:${currentLobby.id}`)
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "lobby_players",
          filter: `lobby_id=eq.${currentLobby.id}`
        },
        (payload) => handlePlayerLeave(payload)
      )
      .subscribe();

    return () => {
      supabaseJoinChannel.unsubscribe();
      supabaseLeaveChannel.unsubscribe();
    };
  }, [currentLobby]);

  const fetchLobby = async (id: number) => {
    const { data, error } = await getLobbyAction(id);

    if (error) {
      console.error(error);
      return false;
    }

    if (!data) {
      console.error("Lobby not found");
      return false;
    }

    setCurrentLobby(data);
    setLobbyStatus(LobbyStatus.Joined);
    await fetchPlayers(data.id);
  };

  const createLobby = async (name: string, password: string): Promise<boolean> => {
    console.log("Creating lobby", name, password);
    if (!profile) {
      console.error("No profile");
      return false;
    }

    const { data, error } = await createLobbyAction(profile.id, name, password);

    if (error) {
      console.error(error);
      return false;
    }

    if (!data) {
      console.error("Lobby not found");
      return false;
    }

    setCurrentLobby(data ?? null);
    setLobbyStatus(LobbyStatus.Joined);
    localStorage.setItem("lobbyId", data.id.toString());
    await fetchPlayers(data.id);

    return true;
  };

  const joinLobby = async (name: string, password: string): Promise<boolean> => {
    console.log("Joining lobby", name, password);
    if (!profile) {
      console.error("No profile");
      return false;
    }

    // Find lobby by id
    const { data, error } = await joinLobbyAction(profile.id, name, password);

    if (error) {
      console.error(error);
      return false;
    }

    if (!data) {
      console.error("Lobby not found");
      return false;
    }

    setCurrentLobby(data ?? null);
    setLobbyStatus(LobbyStatus.Joined);
    localStorage.setItem("lobbyId", data.id.toString());
    await fetchPlayers(data.id);

    return true;
  };

  const leaveLobby = async () => {
    console.log("Leaving lobby");
    if (!profile) {
      console.error("No profile");
      return;
    }
    if (!currentLobby) {
      console.error("No lobby");
      return;
    }

    const { error } = await leaveLobbyAction(profile.id, currentLobby.id);
    if (error) {
      console.error(error);
      return;
    }

    localStorage.removeItem("lobbyId");
    localStorage.removeItem("gameId");
    localStorage.removeItem("boardId");
    setCurrentLobby(null);
    setLobbyStatus(LobbyStatus.None);
    setPlayers([]);
  };

  const handlePlayerJoined = async (payload: RealtimePostgresInsertPayload<{ [p: string]: any }>) => {
    const player = payload.new as Tables<"lobby_players">;

    console.log(player);
    await addPlayer(player.player_id);
  };

  const handlePlayerLeave = (payload: RealtimePostgresDeletePayload<{ [p: string]: any }>) => {
    const lobby_player = payload.new as Tables<"lobby_players">;

    console.log(lobby_player);
    removePlayer(lobby_player.player_id);
  };

  const fetchPlayers = async (lobby_id: number) => {
    const { data: players, error: playersError } = await getLobbyPlayersAction(lobby_id);

    if (playersError) {
      console.error(playersError);
      return false;
    }

    if (!players) {
      console.error("No players");
      return false;
    }

    setPlayers(players);
  };

  const addPlayer = async (profile_id: string) => {
    const { data: profile, error } = await getUserProfileAction(profile_id);
    console.log("Adding player", profile_id, profile);

    if (!profile) {
      console.error("No profile");
      return;
    }

    if (error) {
      console.error(error);
      return;
    }

    setPlayers([...players, profile]);
  };

  const removePlayer = (profile_id: string) => {
    console.log("Removing player", profile_id);

    setPlayers([...players.filter((p) => p.id !== profile_id)]);
  };

  return (
    <LobbyContext.Provider
      value={{ currentLobby, lobbyStatus, players, createLobby, joinLobby, leaveLobby, setLobbyStatus }}
    >
      {children}
    </LobbyContext.Provider>
  );
};
