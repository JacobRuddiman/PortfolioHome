/// Have HTML and image on cards

'use client';

import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';

// Utility function for randomization
function getRandomVector(range = [0, 1], is3D = true) {
  const [min, max] = range;
  const randomValue = () => Math.random() * (max - min) + min;

  if (is3D) {
    return [randomValue(), randomValue(), randomValue()];
  }
  return randomValue();
}

function createImageTexture(imagePath) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set canvas dimensions
  canvas.width = 1024;
  canvas.height = 700;

  // Set background color and clear canvas
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Add an image
  const image = new Image();
  image.src = r'C:\Users\jacob\Desktop\Coding\portfolio-home\src\app\components\Card.tsx'; // Provide the image path here
  image.onload = () => {
    // Draw image to fill the entire canvas
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  // Return texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.center.set(0.5, 0.5);
  return texture;
}


function createTextTexture(text) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set canvas dimensions
  canvas.width = 1024;
  canvas.height = 700;

  // Set background color and clear canvas
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Add an image
  const image = new Image();
  image.src = r'C:\Users\jacob\Desktop\Coding\portfolio-home\src\app\components\Card.tsx'; // Provide the image path here
  image.onload = () => {
    // Draw image at a specified position
    context.drawImage(image, canvas.width / 4, 50, canvas.width / 2, canvas.height / 3);

    // Draw text after the image is loaded
    context.fillStyle = 'black';
    context.font = '30px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height * 0.8);
  };

  // Return texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.center.set(0.5, 0.5);
  return texture;
}


function Card({ id, setSelectedCard, isSelected }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: getRandomVector([-2, 2]).map((v, i) => (i === 1 ? v + 2 : v)), // Ensure Y starts above ground
    rotation: getRandomVector([0, Math.PI]),
    args: [1.5, 1, 0.05],
  }));

  const textTexture = React.useMemo(() => createImageTexture(`Card ${id + 1}`), [id]);
  const { camera } = useThree();

  useEffect(() => {
    if (isSelected) {
      // Pause physics by setting mass to 0hh23rt1
      api.mass.set(0);
      api.position.set(0, 1, 2); // Center position
      api.velocity.set(0, 0, 0); // Stop movement
      api.angularVelocity.set(0, 0, 0); // Stop rotation
  
      // Rotate the card to face the camera
      const lookAtVector = new THREE.Vector3();
      const cardPosition = new THREE.Vector3();
      ref.current.getWorldPosition(cardPosition); // Get current card position
      lookAtVector.subVectors(camera.position, cardPosition).normalize();
      const angleY = Math.atan2(lookAtVector.x, lookAtVector.z);
      api.rotation.set(0, angleY, 0); // Face the camera while maintaining the large face orientation
    } else {
      // Resume physics by restoring mass, position, rotation, and velocity
      api.mass.set(1);
  
      // Define ranges for each axis
      const xRange = [-2, 2]; // X-axis range
      const yRange = [3, 4];  // Y-axis range (ensures above ground)
      const zRange = [-3, 0]; // Z-axis range
  
      // Set random position using the ranges
      api.position.set(
        getRandomVector(xRange, false), // X
        getRandomVector(yRange, false), // Y
        getRandomVector(zRange, false)  // Z
      );
  
      // Set random rotation
      api.rotation.set(...getRandomVector([0, Math.PI]));
  
      // Set random velocity and angular velocity
      api.velocity.set(0, 0, 0);
      api.angularVelocity.set(...getRandomVector([-1, 1]));
    }
  }, [isSelected]);
  

  const handleClick = () => {
    setSelectedCard(isSelected ? null : id);
  };

  return (
    <mesh ref={ref} onClick={handleClick} castShadow>
      <boxGeometry args={[1.5, 1, 0.05]} />
      {/* Apply materials only to large faces */}
      <meshStandardMaterial attach="material-4" map={textTexture} /> {/* Front large face */}
      <meshStandardMaterial attach="material-5" map={textTexture} /> {/* Back large face */}
      <meshStandardMaterial attach="material-0" color="blue" /> {/* Edge */}
      <meshStandardMaterial attach="material-1" color="blue" /> {/* Edge */}
      <meshStandardMaterial attach="material-2" color="blue" /> {/* Edge */}
      <meshStandardMaterial attach="material-3" color="blue" /> {/* Edge */}
    </mesh>
  );
}
