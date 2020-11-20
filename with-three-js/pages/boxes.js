import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import {
  OrbitControls,
  StandardEffects,
  Box,
  Circle,
  Cylinder,
  Tube,
} from 'drei';
import { TubeGeometry } from 'three';

const MyBox = (props) => {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <Tube
      args={[1, 1, 5, 10]}
      {...props}
      ref={mesh}
      scale={active ? [6, 6, 6] : [5, 5, 5]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial
        attach="material"
        color={hovered ? '#2b6c76' : '#720b23'}
      />
    </Tube>
  );
};

const BoxesPage = () => {
  return [
    <h1>Click on me - Hover me :)</h1>,
    <Canvas camera={{ position: [0, 0, 35] }}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <MyBox position={[10, 0, 0]} />
      <Suspense fallback={null}>
        <StandardEffects smaa />
      </Suspense>
    </Canvas>,
  ];
};

export default BoxesPage;
