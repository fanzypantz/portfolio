"use client";

import { Tables } from "@supabase/database.types";
import { GameContext } from "@components/BoardGame/GameProvider";
import { useContext } from "react";

const LobbyInfo = ({ lobby }: { lobby: Tables<"lobbies"> }) => {
  const { currentGame, createGame, closeGame } = useContext(GameContext);

  return (
    <div>
      <div>{lobby.name}</div>

      {currentGame ? (
        <button onClick={() => closeGame()}>Close Game</button>
      ) : (
        <button onClick={() => createGame()}>Create Game</button>
      )}
    </div>
  );
};

export default LobbyInfo;
