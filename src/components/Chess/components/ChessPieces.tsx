import ChessPiece from "@components/Chess/components/ChessPiece";
import { useContext } from "react";
import { ChessContext } from "@components/Chess/components/chessProvider";
import { observer } from "mobx-react-lite";

const ChessPieces = observer(() => {
  const { board } = useContext(ChessContext);

  if (!board) {
    return null;
  }

  board.debugPrint();

  return (
    <>
      {board.pieces.map((piece, index) => {
        return <ChessPiece key={index} piece={piece} />;
      })}
    </>
  );
});

export default ChessPieces;
