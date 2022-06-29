import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, MeshStandardMaterial } from 'three';

export type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
};
