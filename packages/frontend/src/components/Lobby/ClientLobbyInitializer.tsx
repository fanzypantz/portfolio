"use client";

import { useLobbyStore } from "@/lib/Lobby/stores/lobbyStore";
import { ChatMessageType, LobbyType } from "@lib/Constants/types";
import { useEffect } from "react";
import { JoinStatus } from "@lib/Lobby/enums";

function ClientLobbyInitializer({
  loadedLobby,
  loadedMessages
}: {
  loadedLobby: LobbyType | null;
  loadedMessages: ChatMessageType[] | null;
}) {
  const setCurrentLobby = useLobbyStore((state) => state.setCurrentLobby);
  const setPlayers = useLobbyStore((state) => state.setPlayers);
  const setJoinStatus = useLobbyStore((state) => state.setJoinStatus);
  const setMessages = useLobbyStore((state) => state.setMessages);

  useEffect(() => {
    async function initializeLobby() {
      if (loadedLobby) {
        setCurrentLobby(loadedLobby);
        setPlayers(loadedLobby.lobbyMembers.map((member) => member.user));
        setJoinStatus(JoinStatus.Joined);
      }
      if (loadedMessages) {
        setMessages(loadedMessages);
      }
    }

    initializeLobby();
  }, [loadedLobby, setCurrentLobby, setJoinStatus, setPlayers]);

  return null; // This component is for side effects only
}

export default ClientLobbyInitializer;
