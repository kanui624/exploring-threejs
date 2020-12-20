// React
import { useRef, useState, Suspense, useMemo, useEffect } from 'react';
// Three
import * as THREE from 'three';
// React Three Fiber
import { useThree, Canvas, useFrame, useLoader } from 'react-three-fiber';
// Drei
import { softShadows, OrbitControls } from '@react-three/drei';

// React Spring
import { useSpring, a } from 'react-spring/three';

// GLTF Objects
import Tree from '../three/tree';

import Router from 'next/router';
import { Geometry } from 'three';

softShadows();

const OControls = () => {
  return (
    <OrbitControls
      enableZoom={false}
      minPolarAngle={Math.PI / 2 - 0.4}
      maxPolarAngle={Math.PI / 2 - 0.4}
      autoRotate
    />
  );
};

const Lights = () => {
  return <ambientLight intensity={0.8} />;
};

const Group = () => {
  return (
    <group position={[0, 0, 0]}>
      <Lights />
      <Tree />
      {/* <menuOption/> */}

      <OControls />
    </group>
  );
};

const Three = () => {
  return (
    <Canvas
      className="c"
      shadowMap
      colorManagement
      camera={{ position: [1, 1, 1], fov: 13 }}
      pixelRatio={2}
    >
      <Suspense fallback={null}>
        <Group />
      </Suspense>
    </Canvas>
  );
};

export default Three;
