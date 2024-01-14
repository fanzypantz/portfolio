"use client";

import { createContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database, Tables } from "@supabase/database.types";
import { createLobbyAction } from "@components/Lobby/actions/createLobby";
import { joinLobbyAction } from "@components/Lobby/actions/joinLobby";
import { getLobbyAction } from "@components/Lobby/actions/getLobby";

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
  createLobby: (name: string, password: string) => Promise<boolean>;
  joinLobby: (name: string, password: string) => Promise<boolean>;
  leaveLobby: () => void;
  setLobbyStatus: (status: LobbyStatus) => void;
}

export const LobbyContext = createContext({} as LobbyContextInterface);

export const LobbyProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [currentLobby, setCurrentLobby] = useState<Tables<"lobbies"> | null>(null);
  const [lobbyStatus, setLobbyStatus] = useState<LobbyStatus>(LobbyStatus.None);

  useEffect(() => {
    const lobbyId = localStorage.getItem("lobbyId");

    if (lobbyId) {
      fetchLobby(parseInt(lobbyId));
    }
  }, []);

  const fetchLobby = async (id: number) => {
    const { data, error } = await getLobbyAction(id);

    if (error) {
      console.error(error);
      return false;
    }

    setCurrentLobby(data ?? null);

    if (data) {
      setLobbyStatus(LobbyStatus.Joined);
    }
  };

  const createLobby = async (name: string, password: string): Promise<boolean> => {
    console.log("Creating lobby", name, password);

    const { data, error } = await createLobbyAction(name, password);

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

    return true;
  };

  const joinLobby = async (name: string, password: string): Promise<boolean> => {
    console.log("Joining lobby", name, password);

    // Find lobby by id
    const { data, error } = await joinLobbyAction(name, password);

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

    return true;
  };

  const leaveLobby = () => {
    localStorage.removeItem("lobbyId");
    setCurrentLobby(null);
    setLobbyStatus(LobbyStatus.None);
  };

  return (
    <LobbyContext.Provider value={{ currentLobby, lobbyStatus, createLobby, joinLobby, leaveLobby, setLobbyStatus }}>
      {children}
    </LobbyContext.Provider>
  );
};
