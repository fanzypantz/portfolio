"use client";

import { GameContext } from "@components/BoardGame/GameProvider";
import { useContext } from "react";
import { LobbyContext } from "@components/Lobby/LobbyProvider";
import { Lobby, User } from "@prisma/client";

const LobbyInfo = ({ lobby, user }: { lobby: Lobby; user: User }) => {
  const { players, currentLobby, leaveLobby } = useContext(LobbyContext);
  const { currentGameType, createGame, closeGame } = useContext(GameContext);

  if (!user) {
    return null;
  }

  console.log("players : ", players);

  return (
    <div>
      <div>Lobby name: {lobby.name}</div>
      {currentLobby && <button onClick={() => leaveLobby()}>Leave Lobby</button>}

      <div>
        <div>Players:</div>
        {players.map((player) => (
          <div key={player.id}>{player.username}</div>
        ))}
      </div>

      {currentGameType ? (
        <button onClick={() => closeGame()}>Close Game</button>
      ) : (
        <button onClick={() => createGame(lobby.id, user.id)}>Create Game</button>
      )}
    </div>
  );
};

export default LobbyInfo;
