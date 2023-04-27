"use client";

import { ThreeEvent, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import StandardMesh from "@components/3D/StandardMesh";
import { Piece, PieceColor } from "@components/BoardGame/Piece";
import { Camera, Mesh, Vector2, Vector3 } from "three";
import { black, hover, white } from "@components/BoardGame/Materials";
import { PointerEvent, useRef, useState } from "react";
import useCursor from "@components/BoardGame/UseCursor";

const ChessPiece = ({ piece }: { piece: Piece }) => {
  const { selected, handleClick, meshRef } = useCursor();
  const gltf = useLoader(GLTFLoader, `/models/${piece.type}.glb`);

  const [hovered, setHovered] = useState(false);

  const onHover = (e: any, value: boolean) => {
    e.stopPropagation();
    setHovered(value);
  };
  return (
    <StandardMesh
      // @ts-ignore
      meshRef={meshRef}
      onPointerOver={(e) => onHover(e, true)}
      onPointerOut={(e) => onHover(e, false)}
      onClick={handleClick}
      gltf={gltf}
      position={new Vector3(piece.position.currentPosition.y / 5, 0, piece.position.currentPosition.x / 5)}
      material={hovered ? hover : piece.color === PieceColor.White ? white : black}
    />
  );
};

export default ChessPiece;
