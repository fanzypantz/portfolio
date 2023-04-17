"use client";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import StandardMesh from "@components/3D/StandardMesh";
import { PieceColor } from "@components/BoardGame/Piece";
import { Position } from "@components/BoardGame/Position";
import { Vector3 } from "three";

const RookPiece = ({ color, position }: { color: PieceColor; position: Position }) => {
  const gltf = useLoader(GLTFLoader, "/models/Rook" + ".glb");

  return (
    <StandardMesh
      gltf={gltf}
      position={new Vector3(position.currentPosition.x / 5, 0, position.currentPosition.y / 5)}
    />
  );
};

export default RookPiece;
