import { useContext } from "react";
import { ChessContext } from "@components/Chess/chessProvider";
import { PieceColor } from "@lib/BoardGame/Piece";
import ChessPiece from "@components/Chess/ChessPiece";
import { BoardPosition } from "@lib/BoardGame/Position";
import { observer } from "mobx-react-lite";

const CapturedPieces = observer(() => {
  const { game, board } = useContext(ChessContext);

  const whitePieces = board?.capturedPieces.filter((piece) => piece.color === PieceColor.White);
  const blackPieces = board?.capturedPieces.filter((piece) => piece.color === PieceColor.Black);

  whitePieces?.forEach((piece) => {
    piece.setPosition(new BoardPosition(0, 0));
  });

  blackPieces?.forEach((piece) => {
    piece.setPosition(new BoardPosition(0, 0));
  });

  console.log("white : ", whitePieces);
  console.log("black : ", blackPieces);

  return (
    <group position={[-0.5, -0.2, 0.7]}>
      <group position={[0, 0, -1.1]}>
        {whitePieces?.map((piece, index) => {
          return (
            <group key={index} position={[index / 6, 0, 0]}>
              <ChessPiece piece={piece} />;
            </group>
          );
        })}
      </group>

      <group position={[0, 0, 1.1]}>
        {blackPieces?.map((piece, index) => {
          return (
            <group key={index} position={[index / 6, 0, 0]}>
              <ChessPiece piece={piece} />;
            </group>
          );
        })}
      </group>
    </group>
  );
});

export default CapturedPieces;
