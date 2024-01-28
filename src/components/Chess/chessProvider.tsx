import { createContext, useEffect, useState } from "react";
import ChessGame from "@lib/Chess/ChessGame";
import ChessBoard from "@lib/Chess/ChessBoard";
import { AbstractPlayer } from "@lib/BoardGame/Player";
import { Piece, PieceColor } from "@lib/BoardGame/Piece";
import { AbstractGameScore } from "@lib/BoardGame/GameScore";
import { Tables } from "@supabase/database.types";
import { supabaseBrowserClient } from "@lib/Auth/supabase";

export interface ChessContextInterface {
  game: ChessGame | null;
  board: ChessBoard | null;
  player1: AbstractPlayer | null;
  player2: AbstractPlayer | null;
  gameScore: AbstractGameScore | null;
}

export const ChessContext = createContext({} as ChessContextInterface);

export const ChessProvider = ({
  game_id,
  pieces,
  children
}: {
  game_id?: number;
  pieces: Tables<"pieces">[] | null;
  children: JSX.Element | JSX.Element[];
}) => {
  const [chessGame, setChessGame] = useState<ChessGame | null>(null);
  const [chessBoard, setChessBoard] = useState<ChessBoard | null>(null);
  const [player1, setPlayer1] = useState<AbstractPlayer | null>(null);
  const [player2, setPlayer2] = useState<AbstractPlayer | null>(null);
  const [gameScore, setGameScore] = useState<AbstractGameScore | null>(null);

  useEffect(() => {
    init();
  }, [pieces]);

  const init = async () => {
    if (!game_id) {
      console.log("No game id");
      return;
    }
    if (pieces === null) {
      console.log("No pieces");
      return;
    }
    const board = new ChessBoard(game_id);
    const p1 = new AbstractPlayer("Andreas", PieceColor.White);
    const p2 = new AbstractPlayer("Amalie", PieceColor.Black);
    const score = new AbstractGameScore();
    const newChessGame = new ChessGame(game_id, board, [p1, p2], score);

    if (board.pieces.length === 0 && pieces.length > 0) {
      console.log("Initiating with database");
      await board.initBoardFromDatabase(pieces);
    } else if (board.pieces.length === 0 && pieces.length === 0) {
      console.log("Initiating with new game");
      await board.initBoard();
    } else {
      console.log("Not initiating board");
    }

    // TODO maybe add a double check if any duplicated pieces was created in the database
    // Issue happens when browser refreshes and there are no pieces in the database
    // Probably will not happen in production due to React strict mode running useEffect twice in development

    setChessBoard(board);
    setPlayer1(p1);
    setPlayer2(p2);
    setGameScore(score);
    setChessGame(newChessGame);
  };

  // const initMoveListener = async () => {
  //   const { data, error } = await supabaseBrowserClient
  //     .from("chat_messages")
  //     .select(`*, profiles(username)`)
  //     .eq("lobby_id", lobby_id)
  //     .order("id", { ascending: false })
  //     .limit(10);
  // };

  return (
    <ChessContext.Provider
      value={{
        game: chessGame,
        board: chessBoard,
        player1: player1,
        player2: player2,
        gameScore: gameScore
      }}
    >
      {children}
    </ChessContext.Provider>
  );
};
