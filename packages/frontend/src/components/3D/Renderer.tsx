"use client";

import styles from "@styles/Renderer.module.scss";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

const Renderer = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
  };

  return (
    <div className={isOpen ? styles.canvasOpen : styles.canvas} onClick={() => handleClick()}>
      <Canvas camera={{ position: [0, 2, 4] }} shadows>
        {children}
      </Canvas>
    </div>
  );
};

export default Renderer;
