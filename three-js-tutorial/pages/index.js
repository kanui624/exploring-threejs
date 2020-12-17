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
      minPolarAngle={Math.PI / 2 - 0.5}
      maxPolarAngle={Math.PI / 2 - 0.5}
      autoRotate
    />
  );
};

const SphereMesh = ({ position, args, speed, link, name }) => {
  const text = useRef(null);
  const [expand, setExpand] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [resize, setResize] = useState(false);

  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const { raycaster } = useThree();

  const props = useSpring({
    scale: expand ? [0.5, 0.5, 0.5] : [0.25, 0.25, 0.25],
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
  };

  const handlePointerUp = () => {
    setExpand(!expand);
    setTimeout(() => {
      Router.push(`/${link}`);
    }, 500);
  };

  const handleHover = (e, cursor) => {
    e.stopPropagation();
    if (cursor) {
      setHovered(cursor);
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
      setHovered(cursor);
    }
  };

  return (
    <a.mesh
      onPointerDown={(e) => handlePointerDown(e)}
      onPointerUp={() => handlePointerUp()}
      onPointerOver={(e) => handleHover(e, true)}
      onPointerOut={(e) => handleHover(e, false)}
      scale={props.scale}
      castShadow
      position={position}
    >
      <sphereBufferGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'white' : '#bf8040'}
      />
    </a.mesh>
  );
};

const Lights = () => {
  const dlight = useRef();

  return (
    <>
      <ambientLight intensity={0.6} />
      {/* <directionalLight
        ref={dlight}
        castShadow
        position={[30, 30, 30]}
        intensity={1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      /> */}
      {/* <pointLight position={[30, 0, 0]} intensity={0.1} /> */}
      {/* <pointLight position={[5, -10, 0]} intensity={0.2} /> */}
    </>
  );
};

const Shadow = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <shadowMaterial attach="material" opacity={0.4} />
    </mesh>
  );
};

const Group = () => {
  return (
    <group position={[0, 0, 0]}>
      <Lights />
      <Shadow />
      {/* <SphereMesh
        position={[1.5, 0, 1]}
        speed={3}
        link={'boxonelink'}
        name={'one'}
      />
      <SphereMesh
        position={[-1.4, 3.3, 0.8]}
        speed={3}
        link={'boxtwolink'}
        name={'two'}
      />
      <SphereMesh
        position={[0.5, 3, -1.5]}
        speed={3}
        link={'boxthreelink'}
        name={'three'}
      /> */}
      <Tree />
      <OControls />
    </group>
  );
};

const Three = () => {
  THREE.LinearFilter;
  return (
    <Canvas
      className="c"
      shadowMap
      colorManagement
      camera={{ position: [1, 1, 1], fov: 10 }}
      // onCreated={({ scene }) => {
      //   scene.background = new THREE.TextureLoader().load(
      //     '/images/whitetpaper.png'
      //   );
      // }}
      pixelRatio={2}
    >
      <Suspense fallback={null}>
        <Group />
      </Suspense>
    </Canvas>
  );
};

export default Three;
