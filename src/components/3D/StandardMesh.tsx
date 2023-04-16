"use client";

import { GLTF } from "three-stdlib";
import { ObjectMap } from "@react-three/fiber";
import { Vector3, Euler, Mesh } from "three";

const StandardMesh = ({
  children,
  gltf,
  position = new Vector3(0, 0, 0),
  rotation = new Euler(0, 0, 0),
  scale = new Vector3(1, 1, 1)
}: {
  children?: JSX.Element | JSX.Element[];
  gltf: GLTF & ObjectMap;
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
            <mesh key={index} receiveShadow castShadow geometry={node.geometry} material={node.material}>
              {children}
            </mesh>
          );
        })}
    </group>
  );
};

export default StandardMesh;
