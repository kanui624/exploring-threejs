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

const MenuRip = ({
  link,
  label,
  imgFront,
  imgBack,
  scale,
  pos,
  frontRotate,
  backRotate,
}) => {
  const [menuRipFront, menuRipBack] = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return [loader.load(imgFront), loader.load(imgBack)];
  }, [imgFront, imgBack]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
  };

  const handlePointerUp = (e) => {
    setTimeout(() => {
      Router.push(`/${link}`);
    }, 500);
  };

  // const plane = useRef();

  const handleHover = (e, cursor) => {
    e.stopPropagation();
    if (cursor) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  };

  return (
    <group>
      <mesh position={pos} rotation={backRotate}>
        <planeBufferGeometry attach="geometry" args={scale} />
        <meshStandardMaterial attach="material" transparent>
          <primitive attach="map" object={menuRipBack} />
        </meshStandardMaterial>
      </mesh>
      <mesh
        name={label}
        position={pos}
        rotation={frontRotate}
        onPointerDown={(e) => handlePointerDown(e)}
        onPointerUp={(e) => handlePointerUp(e)}
        onPointerOver={(e) => handleHover(e, true)}
        onPointerOut={(e) => handleHover(e, false)}
      >
        <planeBufferGeometry
          attach="geometry"
          args={scale}
          // ref={plane}
        />
        <meshStandardMaterial attach="material" transparent>
          <primitive attach="map" object={menuRipFront} />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};

const Lights = () => {
  return <ambientLight intensity={0.75} />;
};

const Group = () => {
  const menuOptions = [
    {
      id: 0,
      link: 'baklava',
      label: 'baklava',
      imgFUrl: 'baklava.png',
      imgBUrl: 'baklava-back.png',
      scale: [0.18, 0.18],
      position: [0.2, 0.055, 0.05],
      frontRotation: [0, 1.2, 0],
      backRotation: [0, Math.PI + 1.2, 0],
    },
    {
      id: 1,
      link: 'animalrights',
      label: 'animal rights',
      imgFUrl: 'animal-rights.png',
      imgBUrl: 'animal-rights-back.png',
      scale: [0.17, 0.17],
      position: [0.01, 0.05, 0.25],
      frontRotation: [0, 0, 0],
      backRotation: [0, Math.PI, 0],
    },
    {
      id: 2,
      link: 'about',
      label: 'about',
      imgFUrl: 'about.png',
      imgBUrl: 'about-back.png',
      scale: [0.18, 0.18],
      position: [0.1, 0.1, -0.18],
      frontRotation: [0, Math.PI - 0.45, 0],
      backRotation: [0, Math.PI * 2 - 0.45, 0],
    },
    {
      id: 3,
      link: 'merch',
      label: 'merch',
      imgFUrl: 'merch.png',
      imgBUrl: 'merch-back.png',
      scale: [0.17, 0.17],
      position: [-0.1, 0, -0.18],
      frontRotation: [0.05, Math.PI + 0.4, 0],
      backRotation: [0.05, Math.PI * 2 + 0.4, 0],
    },
    {
      id: 4,
      link: 'contact',
      label: 'contact',
      imgFUrl: 'contact.png',
      imgBUrl: 'contact-back.png',
      scale: [0.18, 0.18],
      position: [-0.2, 0.01, 0.07],
      frontRotation: [0, Math.PI + 1.9, 0],
      backRotation: [0, Math.PI * 2 + 1.9, 0],
    },
  ];
  return (
    <group position={[0, 0, 0]}>
      <Lights />
      <Tree />
      {menuOptions.map(
        ({
          id,
          label,
          link,
          scale,
          imgFUrl,
          imgBUrl,
          position,
          frontRotation,
          backRotation,
        }) => (
          <MenuRip
            key={id}
            label={label}
            link={link}
            scale={scale}
            imgFront={`/menurips/front/${imgFUrl}`}
            imgBack={`/menurips/back/${imgBUrl}`}
            pos={position}
            frontRotate={frontRotation}
            backRotate={backRotation}
          />
        )
      )}
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
