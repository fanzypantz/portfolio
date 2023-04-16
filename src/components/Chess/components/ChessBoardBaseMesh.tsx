"use client";

import { PivotControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import StandardMesh from "@components/3D/StandardMesh";

const ChessBoardBaseMesh = () => {
  const gltf = useLoader(GLTFLoader, "/models/ChessTable.glb");

  return <StandardMesh gltf={gltf} />;
};

export default ChessBoardBaseMesh;
