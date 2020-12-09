import React, { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import Bird from '../components/Bird';
import gsap from 'gsap';

const birdTest = () => {
  const [pos, setPos] = useState([15, 5, 0]);
  return (
    <Canvas camera={{ position: [0, 5, 30] }}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <Bird position={[15, 5, 0]} />
      </Suspense>
    </Canvas>
  );
};

export default birdTest;
