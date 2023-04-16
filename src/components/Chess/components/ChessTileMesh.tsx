"use client";

import { PivotControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import StandardMesh from "@components/3D/StandardMesh";

const ChessTileMesh = ({ useControls = false }) => {
  const gltf = useLoader(GLTFLoader, "/models/ChessTile.glb");

  return (
    <PivotControls visible={useControls} scale={1}>
      <StandardMesh gltf={gltf} />
    </PivotControls>
  );
};

export default ChessTileMesh;
