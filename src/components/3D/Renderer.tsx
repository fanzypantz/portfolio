"use client";

import styles from "@styles/Renderer.module.scss";
import { Canvas, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";

const Renderer = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  return (
    <div className={styles.canvas}>
      <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 2, 4] }} shadows>
        {children}
      </Canvas>
    </div>
  );
};

export default Renderer;
