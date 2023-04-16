"use client";

import styles from "@styles/Renderer.module.scss";
import { Canvas } from "@react-three/fiber";

const Renderer = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  return (
    <div className={styles.canvas}>
      <Canvas camera={{ position: [0, 2, 4] }} shadows>
        {children}
      </Canvas>
    </div>
  );
};

export default Renderer;
