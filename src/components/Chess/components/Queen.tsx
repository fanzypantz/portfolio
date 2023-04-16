"use client";

import { PivotControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import StandardMesh from "@components/3D/StandardMesh";

const Queen = ({ useControls = false }) => {
  const gltf = useLoader(GLTFLoader, "/models/Queen.glb");

  return (
    <PivotControls scale={0.3} anchor={[0, 0, 0]}>
      <StandardMesh gltf={gltf} />
    </PivotControls>
  );
};

export default Queen;
