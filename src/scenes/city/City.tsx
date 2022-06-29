import { Triplet } from '@react-three/cannon';
import {
  Environment,
  PerspectiveCamera,
  Sky,
  useGLTF,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFResult } from '../../types';

const lookAt = new THREE.Vector3(1, 1, -2);

type CamPos = {
  id: string;
  position: Triplet;
  lookAt: number[];
};

export function CityModel({ camPos }: { camPos: CamPos }) {
  const { nodes, materials } = useGLTF('/city.gltf') as unknown as GLTFResult;
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useEffect(() => {
    if (cameraRef.current) {
      lookAt.set(camPos.lookAt[0], camPos.lookAt[1], camPos.lookAt[2]);
      cameraRef.current.lookAt(lookAt);
    }
  });

  return (
    <group dispose={null}>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={camPos.position}
      />
      <mesh geometry={nodes.Plane.geometry} material={materials.road} />
      <group position={[2, 0.78, -1.54]}>
        <mesh
          geometry={nodes.Cube001_1.geometry}
          material={materials.building3}
        />
        <mesh geometry={nodes.Cube001_2.geometry}>
          <meshPhysicalMaterial
            side={THREE.DoubleSide}
            map={materials.b3transparent.map}
            transparent
            roughness={0.3}
            metalness={0}
            transmission={0.99}
          />
        </mesh>
      </group>
      <mesh
        geometry={nodes.Cube002.geometry}
        material={materials.garage}
        position={[1.32, 0.73, 0.48]}
        scale={0.73}
      />
      <mesh
        geometry={nodes.Cube003.geometry}
        material={materials.building1material}
        position={[2, 0.78, 1.95]}
      />
      <group position={[-2.44, 1.67, -1.76]}>
        <mesh
          geometry={nodes.Cube005.geometry}
          material={materials.building2}
        />
        <mesh
          geometry={nodes.Cube005_1.geometry}
          material={materials.b2transparent}
        />
      </group>
      <mesh
        geometry={nodes.Cube006.geometry}
        material={materials.ruinedBuilding}
        position={[6.67, 1.06, -1.3]}
        rotation={[Math.PI, -0.41, Math.PI]}
        scale={[2.21, 1.34, 1.34]}
      />
      <group position={[-1.92, 0.64, 2.03]}>
        <mesh geometry={nodes.Cube009.geometry} material={materials.b4} />
        <mesh
          geometry={nodes.Cube009_1.geometry}
          material={materials.b4transparent}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/city.gltf');

const camPosArr: CamPos[] = [
  { id: '1', position: [-5, 0.2, 0], lookAt: [0, 1.5, 1] },
  { id: '2', position: [-1.5, 1, -7], lookAt: [1, 3, -2] },
  { id: '3', position: [0, 1, -1], lookAt: [1, 1.5, 2] },
];

export function City() {
  const [camPos, setCamPos] = useState(camPosArr[0]);
  return (
    <>
      <Canvas gl={{ physicallyCorrectLights: true, antialias: true }} shadows>
        <directionalLight />
        <CityModel camPos={camPos} />
        <Environment files="hdr.hdr" background={false} resolution={128} />
        <Sky />
      </Canvas>
      <div className="z-50 fixed bottom-0 bg-white p-2">
        {camPosArr.map((item, idx) => (
          <button
            className="text-white bg-black p-2 mx-2"
            key={item.id}
            type="button"
            onClick={() => {
              setCamPos(item);
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </>
  );
}
