import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const MODEL_URL =
  "https://raw.githubusercontent.com/yunusemre482/assets/3d-models/";
export default function Spinner(props) {
  const modelRef = useRef(null);
  const { nodes, materials } = useGLTF(`${MODEL_URL}/spinner-home.glb`);

  const colorMap = useLoader(
    TextureLoader,
    "https://raw.githubusercontent.com/yunusemre482/assets/main/bg-orange-gradient.jpeg"
  );
  useFrame(() => {
    if (modelRef) {
      modelRef.current.rotation.y += 0.05;
      modelRef.current.rotation.z += 0.0005;

      if (modelRef.current.rotation.z > 0.6) {
        modelRef.current.rotation.z = 0;
      }
    }
    if (
      modelRef.current &&
      modelRef.current.material &&
      !modelRef.current.material.map
    ) {
      console.log("texture added");
      modelRef.current.material.map = colorMap;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={modelRef}
        castShadow
        receiveShadow
        geometry={nodes.spinner.geometry}
        material={nodes.spinner.material}
        position={[-2.72, 0, 3.47]}
      />
    </group>
  );
}

useGLTF.preload(`${MODEL_URL}/spinner-home.glb`);
