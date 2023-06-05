"use client";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import StandardMesh from "@components/3D/StandardMesh";
import { Tile, TileColor } from "@components/BoardGame/Tile";
import { Vector3 } from "three";
import { useContext, useState } from "react";
import { black, hover, white } from "@components/BoardGame/Materials";
import { ChessContext } from "@components/Chess/components/chessProvider";

const ChessTileMesh = ({ tile }: { tile: Tile }) => {
  const { game } = useContext(ChessContext);

  const gltf = useLoader(GLTFLoader, "/models/ChessTile.glb");
  const [hovered, setHovered] = useState(false);

  const onHover = (e: any, value: boolean) => {
    e.stopPropagation();
    setHovered(value);
  };

  const onClick = (e: any) => {
    e.stopPropagation();
    if (game && game.board.selectedPiece) {
      console.log(`Moved a piece from ${game.board.selectedPiece.position.toString()} to ${tile.position.toString()}`);

      game.movePiece(game.board.selectedPiece.position, tile.position);
    }
  };

  return (
    <StandardMesh
      onPointerOver={(e) => onHover(e, true)}
      onPointerOut={(e) => onHover(e, false)}
      onClick={(e) => onClick(e)}
      gltf={gltf}
      position={new Vector3(tile.position.y / 5, 0, tile.position.x / 5)}
      material={hovered ? hover : tile.color === TileColor.White ? white : black}
    />
  );
};

export default ChessTileMesh;
