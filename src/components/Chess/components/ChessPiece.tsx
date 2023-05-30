"use client";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import StandardMesh from "@components/3D/StandardMesh";
import { Piece, PieceColor } from "@components/BoardGame/Piece";
import { Vector3 } from "three";
import { black, hover, selected, white } from "@components/BoardGame/Materials";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { ChessContext } from "@components/Chess/components/chessProvider";

const ChessPiece = observer(({ piece, onPieceClick }: { piece: Piece; onPieceClick?: (piece: Piece) => void }) => {
  const gltf = useLoader(GLTFLoader, `/models/${piece.type}.glb`);
  const { chessGame } = useContext(ChessContext);

  const [isHovered, setIsHovered] = useState(false);

  const onHover = (e: any, value: boolean) => {
    e.stopPropagation();
    setIsHovered(value);
  };

  const onClick = () => {
    handlePieceClick();
    if (onPieceClick) {
      onPieceClick(piece);
    }
  };

  const handlePieceClick = () => {
    if (chessGame?.board.selectedPiece?.position.equals(piece.position)) {
      chessGame?.board.unselectPiece();
    } else {
      chessGame?.board.selectPiece(piece);
    }
  };

  const getMaterial = () => {
    if (chessGame?.board.selectedPiece?.position.equals(piece.position)) {
      return selected;
    } else if (isHovered) {
      return hover;
    } else {
      return piece.color === PieceColor.White ? white : black;
    }
  };

  return (
    <StandardMesh
      onPointerOver={(e) => onHover(e, true)}
      onPointerOut={(e) => onHover(e, false)}
      onClick={() => onClick()}
      gltf={gltf}
      position={new Vector3(piece.position.currentPosition.y / 5 - 0.7, 0, piece.position.currentPosition.x / 5 - 0.7)}
      material={getMaterial()}
    />
  );
});

export default ChessPiece;
