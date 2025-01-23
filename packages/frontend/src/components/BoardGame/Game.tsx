"use client";

import ChessGame from "@components/Chess/ChessGame";
import { useLobbyStore } from "@lib/Lobby/stores/lobbyStore";

const Game = () => {
  const { currentGame, currentGameType } = useLobbyStore();

  if (!currentGame) {
    return null; // TODO: Add loading screen
  }

  if (currentGameType === "chess") {
    return <ChessGame />;
  }

  return null;
};

export default Game;
