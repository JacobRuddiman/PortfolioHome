import React, { useRef, useState, useEffect } from 'react';
import { useBox } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';
//Not being used
const CARD_WIDTH = 2;
const CARD_HEIGHT = 3;
const CARD_DEPTH = 0.1;

const ProjectCard = ({ position, rotation, onClick }) => {
  const { camera } = useThree();
  const [ref, api] = useBox(() => ({ mass: 1, position, rotation }));
  const [isSelected, setIsSelected] = useState(false);
  const initialPosition = useRef(position.slice()); // Store initial position
  const initialRotation = useRef(rotation.slice()); // Store initial rotation

  // Spring animations for smooth transitions
  const { scale, pos, rot } = useSpring({
    scale: isSelected ? [1.5, 1.5, 1.5] : [1, 1, 1],
    pos: isSelected ? [0, 0, -0.5] : initialPosition.current, // Much closer to the camera
    rot: isSelected ? [0, 0, 0] : rotation,
    config: { tension: 300, friction: 40 },
  });

  // Update card position and rotation on selection
  useEffect(() => {
    if (isSelected) {
      // Center card very close to the camera and reset rotation
      api.position.set(0, 0, -0.5); // Very close to the camera
      api.rotation.set(0, 0, 0);
      api.mass.set(0); // Set mass to 0 to freeze position
    } else {
      // Restore initial position and rotation
      api.position.set(...initialPosition.current);
      api.rotation.set(...initialRotation.current);
      api.mass.set(1); // Restore mass to allow movement
    }
  }, [isSelected, api, camera.position.z]);

  return (
    <a.mesh
      ref={ref}
      castShadow
      scale={scale}
      position={pos}
      rotation={rot}
      onClick={() => {
        setIsSelected(!isSelected);
        onClick(isSelected ? null : ref.current.position); // Notify parent of selection
      }}
    >
      <boxGeometry args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]} />
      <meshStandardMaterial color={isSelected ? 'lightblue' : 'lightgreen'} />
    </a.mesh>
  );
};

const ProjectPhysics = () => {
  const cards = Array.from({ length: 5 }, (_, i) => ({
    position: [
      Math.random() * 10 - 5, // Random x within a range
      Math.random() * 10 + 5, // Random y above the ground
      Math.random() * 10 - 5, // Random z within a range
    ],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ],
  }));

  const handleCardClick = (position) => {
    // Use this position to focus the camera or perform other actions
    console.log('Card clicked at position:', position);
  };

  return (
    <>
      {cards.map((card, index) => (
        <ProjectCard
          key={index}
          position={card.position}
          rotation={card.rotation}
          onClick={handleCardClick}
        />
      ))}
    </>
  );
};

export default ProjectPhysics;
