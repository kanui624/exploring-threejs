import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import Router from 'next/router';

const Box = (props) => {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [scale, setScale] = useState([8, 8, 8]);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  // const handleMeshClick = () => {
  //   setTimeout(() => {
  //     setActive(true);
  //   }, 1000);
  //   setTimeout(() => {
  //     Router.push('/birds');
  //   }, 2000);
  // };

  const handleMeshClick = () => {
    setActive(true);

    Router.push('/birdtest');
  };

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? scale : [5, 5, 5]}
      onClick={handleMeshClick}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? '#2b6c76' : '#720b23'}
      />
    </mesh>
  );
};

const BirdsPage = () => {
  return [
    <h1>Click on me - Hover me :)</h1>,
    <Canvas camera={{ position: [0, 0, 35] }}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <Box position={[10, 0, 0]} />
        <Box position={[-10, 0, 0]} />
        <Box position={[0, 10, 0]} />
        <Box position={[0, -10, 0]} />
      </Suspense>
    </Canvas>,
  ];
};

export default BirdsPage;
