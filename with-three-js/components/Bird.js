import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

import { useFrame, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Bird = ({ factor, ...props }) => {
  const gltf = useLoader(GLTFLoader, `/glb/flamingo.glb`);
  const group = useRef();
  const mesh = useRef();
  const scene = useRef();
  const [mixer] = useState(() => new THREE.AnimationMixer());
  const [rev, setRev] = useState(true);
  const [scale, setScale] = useState([2, 2, 2]);
  const [pos, setPos] = useState([0, 5, 15]);
  // const mesh = new THREE.Mesh();

  const vex = new THREE.Vector3(8, 3, 4);

  const handleMeshClick = () => {
    setRev(!rev);
    let animation = mixer.clipAction(gltf.animations[0], group.current);

    // animation.clampWhenFinished = true;
    // animation.enable = true;
    if (rev) {
      animation.timeScale = 1;
      animation.repetitions = 0.5;
      animation.clampWhenFinished = true;
      animation.enable = true;
      animation.play();
      // mixer.timeScale = 1;
      // mixer.loop = THREE.LoopOnce;
      // setScale([5, 5, 5]);
      // setPos([0, 0, 0]);
    } else {
      animation.timeScale = -2;
      animation.setLoop(THREE.LoopOnce);
      animation.play();
      // mixer.timeScale = -1;
      // mixer.loop = THREE.LoopOnce;
      // setScale([2, 2, 2]);
      // setPos([0, 5, 15]);
    }
  };

  useFrame((state, delta) => {
    // group.current.rotation.y +=
    // Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5;
    mixer.update(delta * 1);
    // scene.current.position.lerp(vex, 2);
  });

  return (
    <group
      ref={group}
      // position={{ x: 0, y: 0, z: 0 }}
      onClick={handleMeshClick}
    >
      <scene name="Scene" {...props} ref={scene} position={pos}>
        <mesh
          ref={mesh}
          name="Object_0"
          morphTargetDictionary={gltf.__$[1].morphTargetDictionary}
          morphTargetInfluences={gltf.__$[1].morphTargetInfluences}
          rotation={[1.5707964611537577, 0, 0]}
          scale={scale}
        >
          <bufferGeometry attach="geometry" {...gltf.__$[1].geometry} />
          <meshStandardMaterial
            attach="material"
            {...gltf.__$[1].material}
            name="Material_0_COLOR_0"
          />
        </mesh>
      </scene>
    </group>
  );
};

export default Bird;

// USE OBJ AS HREF:
// import Router from 'next/router';
// Router.push('/link');

// ADD TEXT HOVER OVER SECTION OF OBJ:

// ANIMATE FROM FIRST FRAME TO LAST FRAME ON CLICK:
// const [mixer] = useState(() => new THREE.AnimationMixer());
// let animation = mixer
//   .clipAction(gltf.animations[0], group.current)
//   .setLoop(THREE.LoopOnce);
// animation.clampWhenFinished = true;
// animation.enable = true;
// animation.play();

// ALLOW ORBIT CONTROLS ONLY FOR ROTATION ON X AXIS:

// ANIMATE SCALE:

//
