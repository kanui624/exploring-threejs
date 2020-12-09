// React
import { useRef, useState, Suspense } from 'react';
// Three
import * as THREE from 'three';
// React Three Fiber
import { useThree, Canvas, useFrame, useLoader } from 'react-three-fiber';
// Drei
import { softShadows, Html, OrbitControls, useGLTF } from '@react-three/drei';

// React Spring
import { useSpring, a } from 'react-spring/three';

// GLTF Objects
import Tree from '../three/tree';

import Router from 'next/router';
import { Geometry } from 'three';

softShadows();

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

  const handlePointer = (e) => {
    e.stopPropagation();
    console.log(e);
    setExpand(!expand);
    setTimeout(() => {
      Router.push(`/${link}`);
    }, 1000);
  };

  const handleHover = (e, cursor) => {
    e.stopPropagation();
    if (cursor) {
      setHovered(true);
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
      setHovered(false);
    }
  };

  return (
    <a.mesh
      onPointerDown={(e) => handlePointer(e)}
      // onPointerMove={(e) => null}
      onPointerOver={(e) => handleHover(e, true)}
      onPointerOut={(e) => handleHover(e, false)}
      scale={props.scale}
      castShadow
      // ref={mesh}
      position={position}
    >
      <sphereBufferGeometry attach="geometry" />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'white' : '#bf8040'}
      />
      {/* <Html center>
        <p
          onClick={(e) => handleClick(e)}
          onPointerOver={(e) => handleHover(e, true)}
          onPointerOut={(e) => handleHover(e, false)}
        >
          {name}
        </p>
      </Html> */}
    </a.mesh>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={0.3}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* <pointLight position={[-10, 0, -20]} intensity={0.5} /> */}
      <pointLight position={[0, -10, -20]} intensity={0.2} />
    </>
  );
};

const Three = () => {
  return (
    <Canvas
      shadowMap
      colorManagement
      camera={{ position: [0, 20, 0], fov: 25 }}
    >
      <Suspense fallback={null}>
        <Lights />
        <group position={[0, 0, 0]}>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <SphereMesh
            position={[1.5, 0, 1]}
            speed={3}
            link={'boxonelink'}
            name={'one'}
          />
          <SphereMesh
            position={[-1.4, 0.3, 0.8]}
            speed={3}
            link={'boxtwolink'}
            name={'two'}
          />
          <SphereMesh
            position={[0.5, 0, -1.5]}
            speed={3}
            link={'boxthreelink'}
            name={'three'}
          />
          <Tree />
        </group>
        <OrbitControls
          // enableZoom={false}
          // enableKeys={true}
          minPolarAngle={Math.PI / 2 - 0.2}
          maxPolarAngle={Math.PI / 2}
          autoRotate
        />
      </Suspense>
    </Canvas>
  );
};

export default Three;

/* LOAD AN GTLF
import { useGLTF } from '@react-three/drei';
const gtlf = useGLTF('/treeOne.gltf', true);
<primitive object={gtlf.scene} dispose={null} /> */

/* USE OBJ AS HREF:
import Router from 'next/router';
Router.push('/link'); */

/* ANIMATE FROM FIRST FRAME TO LAST FRAME ON CLICK:
const [mixer] = useState(() => new THREE.AnimationMixer());
let animation = mixer
  .clipAction(gltf.animations[0], group.current)
  .setLoop(THREE.LoopOnce);
animation.clampWhenFinished = true;
animation.enable = true;
animation.play(); */

/* LIMIT Y AXIS ORBIT CONTROLS AND AUTO ROTATE:
<OrbitControls
  enableZoom={false}
  enableKeys={true}
  minPolarAngle={Math.PI / 2 - 0.5}
  maxPolarAngle={Math.PI / 2}
  autoRotate
/>; */

/* CHANGE CURSOR TO POINTER ON OBJECT HOVER
const handleHover = (cursor) => {
  cursor
    ? (document.body.style.cursor = 'pointer')
    : (document.body.style.cursor = 'default');
};
  <mesh
    onPointerOver={() => handleHover(true)}
    onPointerOut={() => handleHover(false)}
  > */

/* ONLY CLICK ON MESH CLOSEST TO THE CAMERA
  e.stopPropagation();

HOW TO SET AND INTEVAL IN REACT
useEffect(() => {
  const interval = setInterval(() => {
    console.log('This will run every second!');
  }, 1000);
  return () => clearInterval(interval);
}, []); */

// PLAY ANIMATION ON CLICK

// TRIGGER AUDIO ON CLICK

// TRIGGER ORBIT CONTROLS ANIMATION ON CLICK

// ATTACH HTML TO OBJECT
// SHITTY WAY
//  <Html center>
//   <p
//     onClick={(e) => handleClick(e)}
//     onPointerOver={(e) => handleHover(e, true)}
//     onPointerOut={(e) => handleHover(e, false)}
//   >
//     {name}
//   </p>
// </Html>

// COLLAPSE CANVAS ON LINK CLICK

// PHYSICS ON LEAVES ON HOVER

// ANIMATE WALNUT ON HOVER

// clicked ? (z = 80) : (z = 10),
// from: {
//   z: 80,
// },
// z: 10,
// onFrame: ({ z }) => {
//   camera.position.z = z;
// },

// const springRef = useRef();
// const { size, opacity, ...rest } = useSpring({
//   ref: springRef,
//   from: { size: '20%', background: 'hotpink' },
//   to: { size: open ? '100%' : '20%', background: open ? 'white' : 'hotpink' },
// });
