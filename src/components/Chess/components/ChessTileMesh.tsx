"use client";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import StandardMesh from "@components/3D/StandardMesh";
import { Tile, TileColor } from "@components/BoardGame/Tile";
import { MeshPhysicalMaterial, Vector3 } from "three";
import { useState } from "react";

const white = new MeshPhysicalMaterial({ color: 0xffffff });
const black = new MeshPhysicalMaterial({ color: 0x000000 });
const hover = new MeshPhysicalMaterial({ color: 0x00ff00 });

const ChessTileMesh = ({ tile }: { tile: Tile }) => {
  const gltf = useLoader(GLTFLoader, "/models/ChessTile.glb");
  const [hovered, setHovered] = useState(false);

  const onHover = (e: any, value: boolean) => {
    e.stopPropagation();
    setHovered(value);
  };

  return (
    <StandardMesh
      onPointerOver={(e) => onHover(e, true)}
      onPointerOut={(e) => onHover(e, false)}
      gltf={gltf}
      position={new Vector3(tile.position.x / 5, 0, tile.position.y / 5)}
      material={hovered ? hover : tile.color === TileColor.White ? white : black}
    />
  );
};

export default ChessTileMesh;
