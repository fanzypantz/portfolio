"use client";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import StandardMesh from "@components/3D/StandardMesh";
import { Tile, TileColor } from "@components/BoardGame/Tile";
import { Vector3 } from "three";
import { useContext, useEffect, useState } from "react";
import { black, hover, white, possibleHover } from "@components/BoardGame/Materials";
import { ChessContext } from "@components/Chess/components/chessProvider";
import { observer } from "mobx-react-lite";
import { computed } from "mobx";

const ChessTileMesh = observer(({ tile }: { tile: Tile }) => {
  const { game, board } = useContext(ChessContext);

  const gltf = useLoader(GLTFLoader, "/models/ChessTile.glb");
  const [hovered, setHovered] = useState(false);

  const onHover = (e: any, value: boolean) => {
    e.stopPropagation();
    setHovered(value);
  };

  const onClick = (e: any) => {
    e.stopPropagation();
    if (game && board && board.selectedPiece) {
      console.log(`Moved a piece from ${board.selectedPiece.position.toString()} to ${tile.position.toString()}`);

      game.movePiece(board.selectedPiece.position, tile.position);
    }
  };

  const material = computed(() => {
    console.log("reee : ");
    if (hovered) {
      return hover;
    }
    if (board?.selectedPiece) {
      const isSelected = board.selectedPiece.position.equals(tile.position);
      const isPossibleMove = board.selectedPiece.possibleMoves.some((move) => move.to.equals(tile.position));
      if (isSelected || isPossibleMove) {
        console.log("should be blue : ");
        return possibleHover;
      }
    }
    if (tile.color === TileColor.White) {
      return white;
    } else {
      return black;
    }
  });

  return (
    <StandardMesh
      onPointerOver={(e) => onHover(e, true)}
      onPointerOut={(e) => onHover(e, false)}
      onClick={(e) => onClick(e)}
      gltf={gltf}
      position={new Vector3(tile.position.y / 5, 0, tile.position.x / 5)}
      material={material.get()}
    />
  );
});

export default ChessTileMesh;
