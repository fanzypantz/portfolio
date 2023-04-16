"use client";

import { GLTF } from "three-stdlib";
import { ObjectMap } from "@react-three/fiber";
import { Vector3, Euler, Mesh, Material } from "three";

const StandardMesh = ({
  onPointerOver,
  onPointerOut,
  children,
  gltf,
  material,
  position = new Vector3(0, 0, 0),
  rotation = new Euler(0, 0, 0),
  scale = new Vector3(1, 1, 1)
}: {
  onPointerOver?: (e: any) => void;
  onPointerOut?: (e: any) => void;
  children?: JSX.Element | JSX.Element[];
  gltf: GLTF & ObjectMap;
  material?: Material;
  position?: Vector3;
  rotation?: Euler;
  scale?: Vector3;
}) => {
  return (
    <group position={position} rotation={rotation} scale={scale.multiplyScalar(10)}>
      {gltf.nodes &&
        Object.keys(gltf.nodes).map((key, index) => {
          const node = gltf.nodes[key] as Mesh;
          if (!node || !node.geometry) {
            return;
          }

          return (
            <mesh
              key={index}
              onPointerOver={onPointerOver ? onPointerOver : undefined}
              onPointerOut={onPointerOut ? onPointerOut : undefined}
              receiveShadow
              castShadow
              geometry={node.geometry}
              material={material ? material : node.material}
            >
              {children}
            </mesh>
          );
        })}
    </group>
  );
};

export default StandardMesh;
