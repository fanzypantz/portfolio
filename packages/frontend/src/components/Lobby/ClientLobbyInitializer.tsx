"use client";

import { useLobbyStore } from "@/lib/Lobby/stores/lobbyStore";
import { useEffect } from "react";
import { JoinStatus } from "@lib/Lobby/enums";
import { ChatMessageType } from "@lib/Lobby/Chat/types";
import { LobbyType } from "@lib/Lobby/types";

function ClientLobbyInitializer({
  loadedLobby,
  loadedMessages
}: {
  loadedLobby: LobbyType | null;
  loadedMessages: ChatMessageType[] | null;
}) {
  const setCurrentLobby = useLobbyStore((state) => state.setCurrentLobby);
  const setLobbyMembers = useLobbyStore((state) => state.setLobbyMembers);
  const setJoinStatus = useLobbyStore((state) => state.setJoinStatus);
  const setMessages = useLobbyStore((state) => state.setMessages);

  useEffect(() => {
    async function initializeLobby() {
      if (loadedLobby) {
        setCurrentLobby(loadedLobby);
        setLobbyMembers(loadedLobby.lobbyMembers.map((member) => member.user));
        setJoinStatus(JoinStatus.Joined);
      }
      if (loadedMessages) {
        setMessages(loadedMessages);
      }
    }

    initializeLobby();
  }, [loadedLobby, setCurrentLobby, setJoinStatus, setLobbyMembers]);

  return null; // This component is for side effects only
}

export default ClientLobbyInitializer;
