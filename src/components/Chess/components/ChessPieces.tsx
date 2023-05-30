import ChessPiece from "@components/Chess/components/ChessPiece";
import { useContext } from "react";
import { ChessContext } from "@components/Chess/components/chessProvider";
import { observer } from "mobx-react-lite";

const ChessPieces = observer(() => {
  const { chessGame } = useContext(ChessContext);

  if (!chessGame) {
    return null;
  }

  chessGame.board.debugPrint();

  return (
    <>
      {chessGame.board.pieces.map((piece, index) => {
        return <ChessPiece key={index} piece={piece} />;
      })}
    </>
  );
});

export default ChessPieces;
