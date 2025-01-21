"use client";

import { Lobby, User } from "@prisma/client";
import { useLobbyStore } from "@lib/Lobby/stores/lobbyStore";

const LobbyInfo = ({ lobby, user }: { lobby: Lobby; user: User }) => {
  const { currentLobby, players, createGame, closeGame, currentGameType, leaveLobby } = useLobbyStore();

  if (!user) {
    return null;
  }

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
        <button onClick={() => createGame()}>Create Game</button>
      )}
    </div>
  );
};

export default LobbyInfo;
