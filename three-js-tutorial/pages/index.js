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
import { Geometry, MeshStandardMaterial } from 'three';

softShadows();

const OControls = () => {
  return (
    <OrbitControls
      enableZoom={false}
      minPolarAngle={Math.PI / 2 - 0.4}
      maxPolarAngle={Math.PI / 2 - 0.4}
      // autoRotate
    />
  );
};

const MenuRip = ({ imgFront, imgBack, pos, rotate, url, scale }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load(imgFront), [
    imgFront,
  ]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
  };

  const handlePointerUp = (e) => {
    setTimeout(() => {
      Router.push(`/${url}`);
    }, 500);
  };

  const handleHover = (e, cursor) => {
    e.stopPropagation();
    if (cursor) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  };

  return (
    <mesh
      position={pos}
      rotation={rotate}
      onPointerDown={(e) => handlePointerDown(e)}
      onPointerUp={(e) => handlePointerUp(e)}
      onPointerOver={(e) => handleHover(e, true)}
      onPointerOut={(e) => handleHover(e, false)}
    >
      <planeBufferGeometry attach="geometry" args={scale} />
      <meshLambertMaterial attach="material" transparent>
        <primitive attach="map" object={texture} />
      </meshLambertMaterial>
    </mesh>
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
      <MenuRip
        pos={[0.2, 0.1, 0.08]}
        rotate={[0, 1.2, 0]}
        scale={[0.15, 0.15]}
        imgFront={'/menurips/front/baklava_1.png'}
        url={'boxonelink'}
      />
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
