"use client";

import { Tables } from "@supabase/database.types";
import { GameContext } from "@components/BoardGame/GameProvider";
import { useContext } from "react";
import { UserContext } from "@components/Auth/UserProvider";
import { LobbyContext } from "@components/Lobby/LobbyProvider";
import { User } from "@supabase/gotrue-js";

const LobbyInfo = ({ lobby, user }: { lobby: Tables<"lobbies">; user: User }) => {
  const { currentGameType, createGame, closeGame } = useContext(GameContext);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div>{lobby.name}</div>

      {currentGameType ? (
        <button onClick={() => closeGame()}>Close Game</button>
      ) : (
        <button onClick={() => createGame(lobby.id, user.id)}>Create Game</button>
      )}
    </div>
  );
};

export default LobbyInfo;
