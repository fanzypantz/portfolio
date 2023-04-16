"use client";

import { createRef, memo, RefObject, useRef } from "react";
import {
  AccumulativeShadows,
  RandomizedLight,
  PivotControls,
  Environment as EnvironmentImpl,
  ContactShadows
} from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper } from "three";

const Lighting = () => {
  // const light: RefObject<DirectionalLight> | undefined = createRef<DirectionalLight>();
  // useHelper(light, DirectionalLightHelper, "cyan");

  return (
    <group position={[0, 0, 0]}>
      <directionalLight position={[-15, 15, 15]} intensity={0.5} shadow-mapSize={1024} castShadow />
      <directionalLight position={[15, 5, 15]} intensity={0.5} shadow-mapSize={1024} castShadow />

      {/*<PivotControls scale={1}>*/}
      {/*  <AccumulativeShadows  frames={100} alphaTest={0.85} opacity={0.75} scale={30} position={[0, -1.5, 0]}>*/}
      {/*    <RandomizedLight amount={8} radius={2.5} ambient={0.5} intensity={1} position={direction} bias={0.001} />*/}
      {/*  </AccumulativeShadows>*/}
      {/*</PivotControls>*/}

      <ContactShadows position={[0, -0.4, 0]} opacity={0.2} blur={1} scale={8} />

      <EnvironmentImpl preset="city" />
    </group>
  );
};

export default Lighting;
