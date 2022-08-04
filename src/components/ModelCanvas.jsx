import React, { Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import Spinner from "../models/Spinner";

const ModelCanvas = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[-10, 1, -10]} />
      <pointLight position={[10, -10, -10]} />

      <Suspense fallback={null}>
        <Center>
          <Spinner />
        </Center>
      </Suspense>
    </Canvas>
  );
};
export default ModelCanvas;
