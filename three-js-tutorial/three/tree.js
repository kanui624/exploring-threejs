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

// Three
import { useThree } from 'react-three-fiber';
import { useGLTF } from '@react-three/drei';

const Tree = () => {
  const gtlf = useGLTF('/sapling-v4.gltf');
  const { camera } = useThree();
  console.log(camera);
  return (
    <mesh position={[0, -0.75, 0]}>
      {/* <bufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" /> */}
      <primitive object={gtlf.scene} dispose={null} />;
    </mesh>
  );
};

export default Tree;
