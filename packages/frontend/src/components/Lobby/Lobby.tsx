"use client";

import styles from "./Lobby.module.scss";
import { useContext } from "react";
import LobbyInfo from "@components/Lobby/LobbyInfo";
import CreateLobbyForm from "@components/Lobby/CreateLobbyForm";
import LobbyChat from "@components/Lobby/LobbyChat";
import JoinLobbyForm from "@components/Lobby/JoinLobbyForm";
import { UserContext } from "@components/Auth/UserProvider";
import { useLobbyStore } from "@/lib/Lobby/stores/lobbyStore";
import { JoinStatus, LobbyStatus } from "@lib/Lobby/enums";
import CreateGameForm from "@components/Lobby/CreateGameForm";

const Lobby = () => {
  const { user } = useContext(UserContext);

  const { currentLobby, joinStatus, lobbyStatus, currentGame, setLobbyStatus, closeGame } = useLobbyStore();

  return (
    <div className={styles.container}>
      <h3>Lobby</h3>

      {/*TODO: Move this to a separate component*/}
      {lobbyStatus === LobbyStatus.None && !currentLobby && (
        <button onClick={() => setLobbyStatus(LobbyStatus.Create)}>Create Lobby</button>
      )}
      {lobbyStatus === LobbyStatus.None && !currentLobby && (
        <button onClick={() => setLobbyStatus(LobbyStatus.Join)}>Join Lobby</button>
      )}

      {joinStatus === JoinStatus.Joined && currentLobby && user && <LobbyInfo lobby={currentLobby} user={user} />}
      {joinStatus === JoinStatus.Joined && currentLobby && user && !currentGame && <CreateGameForm />}
      {joinStatus === JoinStatus.Joined && currentLobby && user && currentGame && (
        <button onClick={() => closeGame()}>Close Game</button>
      )}
      {joinStatus === JoinStatus.Joined && currentLobby && <LobbyChat />}

      {lobbyStatus === LobbyStatus.Create && !currentLobby && <CreateLobbyForm />}
      {lobbyStatus === LobbyStatus.Join && !currentLobby && <JoinLobbyForm />}
    </div>
  );
};

export default Lobby;
