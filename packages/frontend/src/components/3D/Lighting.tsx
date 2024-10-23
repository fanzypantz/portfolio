"use client";

import { Environment as EnvironmentImpl } from "@react-three/drei";

const Lighting = () => {
  return (
    <group position={[0, 0, 0]}>
      <directionalLight position={[-15, 15, 15]} intensity={1} shadow-mapSize={1024} castShadow />
      <directionalLight position={[15, 5, 15]} intensity={0.1} shadow-mapSize={1024} castShadow />

      <EnvironmentImpl preset="sunset" />
    </group>
  );
};

export default Lighting;
