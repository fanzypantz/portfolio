"use client";

import styles from "./Lobby.module.scss";
import { LobbyContext, LobbyStatus } from "@components/Lobby/LobbyProvider";
import { useContext, useState } from "react";
import LobbyInfo from "@components/Lobby/LobbyInfo";
import CreateLobbyForm from "@components/Lobby/CreateLobbyForm";
import LobbyChat from "@components/Lobby/LobbyChat";
import JoinLobbyForm from "@components/Lobby/JoinLobbyForm";

const Lobby = () => {
  const { currentLobby, lobbyStatus, leaveLobby, setLobbyStatus } = useContext(LobbyContext);

  return (
    <div className={styles.container}>
      <h3>Lobby</h3>

      {currentLobby && <button onClick={() => leaveLobby()}>Leave Lobby</button>}

      {lobbyStatus === LobbyStatus.None && !currentLobby && (
        <button onClick={() => setLobbyStatus(LobbyStatus.Create)}>Create Lobby</button>
      )}
      {lobbyStatus === LobbyStatus.None && !currentLobby && (
        <button onClick={() => setLobbyStatus(LobbyStatus.Join)}>Join Lobby</button>
      )}
      {lobbyStatus === LobbyStatus.Joined && currentLobby && <LobbyInfo lobby={currentLobby} />}
      {lobbyStatus === LobbyStatus.Joined && currentLobby && <LobbyChat lobby={currentLobby} />}

      {lobbyStatus === LobbyStatus.Create && !currentLobby && <CreateLobbyForm />}
      {lobbyStatus === LobbyStatus.Join && !currentLobby && <JoinLobbyForm />}
    </div>
  );
};

export default Lobby;
