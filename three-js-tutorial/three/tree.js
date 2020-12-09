import { useGTLF } from '@react-three/drei';

const Tree = () => {
  const gtlf = useGLTF('/treeOne.gltf', true);
  const tree = useRef(null);
  // console.log(tree);
  return (
    <mesh ref={tree} castShadow position={[0, -3, 0]} scale={[0.8, 0.8, 0.8]}>
      <primitive object={gtlf.scene} dispose={null} />;
      <bufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" />
    </mesh>
  );
};

export default Tree;
