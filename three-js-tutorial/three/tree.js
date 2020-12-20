// // Three
// import { useGLTF } from '@react-three/drei';

// const Tree = () => {
//   const gtlf = useGLTF('/treeOne.gltf');
//   return (
//     <mesh position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]} receiveShadow castShadow>
//       <bufferGeometry attach="geometry" />
//       <meshStandardMaterial attach="material" />
//       <primitive object={gtlf.scene} dispose={null} />;
//     </mesh>
//   );
// };

// export default Tree;

import { useRef } from 'react';
// Three
import { useGLTF } from '@react-three/drei';

const Tree = () => {
  const paperPlant = useRef();
  const gtlf = useGLTF('/sapling-v6.gltf');
  console.log(paperPlant);
  return (
    <mesh ref={paperPlant} position={[0, -0.74, 0]} rotation={[0, 3.5, 0]}>
      <primitive object={gtlf.scene} dispose={null} />;
    </mesh>
  );
};

export default Tree;
