import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, useBox, useHeightfield } from '@react-three/cannon';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';

// Perlin Noise Surface Component with Collision
function PerlinSurface() {
  const meshRef = useRef();
  const noise3D = createNoise3D();
  const [ref, api] = useHeightfield(() => {
    const width = 100; // Wider surface
    const depth = 100;
    const rows = 50;
    const cols = 50;
    const scale = 3;
    const height = -2;

    const matrix = Array.from({ length: rows }, (_, row) => (
      Array.from({ length: cols }, (_, col) => (
        height * noise3D((row / rows) * scale, (col / cols) * scale, 0)
      ))
    ));

    return {
      args: [matrix, { elementSize: width / cols }],
      position: [0, -2, 0], // Lower surface
      rotation: [-Math.PI / 2, 0, 0],
    };
  });

  useEffect(() => {
    const geometry = meshRef.current.geometry;
    const vertices = geometry.attributes.position.array;
    const scale = 3;
    const height = 1;

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      vertices[i + 2] = height * noise3D(x / scale, y / scale, 0);
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  }, []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
}
// Card Component with Image Texture
function Card({ id, setSelectedCard, isSelected }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [Math.random() * 4 - 2, Math.random() * 2 + 2, Math.random() * 4 - 2],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    args: [1.5, 1, 0.05],
  }));

  const texture = new THREE.TextureLoader().load(`/images/card_image${id}.png`);

  useEffect(() => {
    if (isSelected) {
      api.mass.set(0);
      api.position.set(0, 1, 2);
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(0, 0, 0);
      api.rotation.set(0, 0, 0);
    } else {
      api.mass.set(1);
      api.position.set(Math.random() * 4 - 2, Math.random() * 2 + 2, Math.random() * 4 - 4);
      api.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    }
  }, [isSelected, api]);

  const handleClick = () => {
    setSelectedCard(isSelected ? null : id);
  };

  return (
    <mesh ref={ref} onClick={handleClick} castShadow >
      <boxGeometry args={[1.5, 1, 0.05]} />
      <meshStandardMaterial attach="material-4" map={texture} />
      <meshStandardMaterial attach="material-5" map={texture} />
      <meshStandardMaterial attach="material-0" color="blue" />
      <meshStandardMaterial attach="material-1" color="blue" />
      <meshStandardMaterial attach="material-2" color="blue" />
      <meshStandardMaterial attach="material-3" color="blue" />
    </mesh>
  );
}

// Projects Component
export default function Projects() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <section className="snap-start w-screen h-screen flex-shrink-0 flex items-center justify-center bg-gray-200 text-center p-10">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Physics gravity={[0, -9.8, 0]}>
          <PerlinSurface />
          {[...Array(3)].map((_, index) => (
            <Card
              key={index}
              id={index}
              setSelectedCard={setSelectedCard}
              isSelected={selectedCard === index}
            />
          ))}
        </Physics>
      </Canvas>
    </section>
  );
}
