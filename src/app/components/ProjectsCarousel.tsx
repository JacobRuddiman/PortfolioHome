'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useSpring, a } from '@react-spring/three';
import { Html } from '@react-three/drei';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPrisma, SiPostgresql } from 'react-icons/si'; // Import tech icons

// Example project data with tech stack
const projectData = [
  { 
    id: 1, 
    name: 'PromptBros', 
    description: 'An AI-powered prompt management app.',
    image: '/images/promptbros.webp', // Image path
    techStack: [
      { icon: SiNextdotjs, color: 'text-gray-700' },   // Next.js
      { icon: SiTypescript, color: 'text-blue-600' },  // TypeScript
      { icon: SiTailwindcss, color: 'text-teal-500' }, // Tailwind
      { icon: SiPrisma, color: 'text-[#0C344B]' },     // Prisma (dark teal)
    ],
  },
  { 
    id: 2, 
    name: 'Plant Shop', 
    description: 'An e-commerce platform for plants.',
    image: '/images/plantshop.png', // Image path
    techStack: [
      { icon: SiNextdotjs, color: 'text-gray-700' },   // Next.js
      { icon: SiPostgresql, color: 'text-blue-600' },  // PostgreSQL
      { icon: SiTypescript, color: 'text-blue-600' },  // TypeScript
      { icon: SiTailwindcss, color: 'text-teal-500' }, // Tailwind
    ],
  },
];

// Create a 3D project card component
function ProjectCard({
  position,
  name,
  description,
  image,
  techStack = [], // Provide a default value for techStack
}: {
  position: Vector3;
  name: string;
  description: string;
  image: string;
  techStack?: { icon: any; color: string }[]; // Updated type for techStack
}) {
  const boxWidth = 10;  // Match this to the boxGeometry width
  const boxHeight = 5;  // Match this to the boxGeometry height

  return (
    <a.mesh position={position}>
      {/* 3D box geometry */}
      <boxGeometry args={[boxWidth, boxHeight, 0.2]} /> {/* 3D box dimensions */}
      <meshStandardMaterial color="lightblue" />
      
      {/* HTML content inside the 3D scene */}
      <Html
        position={[0, 0, 0.2]}  // Slightly in front of the 3D box
        transform
        zIndexRange={[1, 0]}    // Ensures the HTML is rendered correctly in front
        style={{
          width: `${boxWidth * 40}px`,  // Scale the width to match the box geometry
          height: `${boxHeight * 40}px`, // Scale the height to match the box geometry
        }}
      >
        <div className="flex w-full h-full border-2">
          {/* Left side (image + misc section in vertical flexbox) */}
          <div className="w-1/2 h-full flex flex-col justify-between">
            {/* Image with margin and rounded bottom-right corner */}
            <div className="w-full flex items-center justify-center mt-1 ml-2">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-contain rounded-br-lg" 
              />
            </div>
            {/* Misc Section for Tech Icons */}
            <div className="w-full h-1/2 flex items-center justify-center space-x-4">
              {techStack.length > 0 ? (
                techStack.map(({ icon: IconComponent, color }, index) => (
                  <IconComponent key={index} className={`text-xl ${color}`} /> // Smaller icon with relevant color
                ))
              ) : (
                <p>No technologies listed</p>
              )}
            </div>
          </div>

          {/* Right side (text content) */}
          <div className="w-1/2 h-full p-5 flex flex-col justify-between">
            <h2 className="font-bold text-left mb-4">{name}</h2> {/* Title aligned to the left */}
            <p className="text-right">{description}</p> {/* Description aligned to the right */}
          </div>
        </div>
      </Html>
    </a.mesh>
  );
}

export default function ProjectSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null); // Ref to detect if the section is visible

  // Function to go to the next project
  const handleNextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectData.length);
  };

  // Function to go to the previous project
  const handlePreviousProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projectData.length) % projectData.length);
  };

  // Add arrow key navigation only when the section is in view (Up and Down)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isInView) return; // Only process if the section is in view
      if (event.key === 'ArrowDown') {
        handleNextProject();
      } else if (event.key === 'ArrowUp') {
        handlePreviousProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup event listener
    };
  }, [isInView]);

  // Use Intersection Observer to detect if the projects section is on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-screen h-screen flex items-center justify-center bg-gray-200">
      <Canvas className="w-full h-full">
        {/* Basic lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />

        {/* Display the current project */}
        {projectData.map((project, index) => {
          // Smooth transition using react-spring
          const { position } = useSpring({
            position: [0, (currentIndex - index) * 10, 0], // Smoothly transition vertically
            config: { tension: 170, friction: 26 },
          });

          return (
            <ProjectCard
              key={project.id}
              position={position as unknown as Vector3} // Smooth vertical position update
              name={project.name}
              description={project.description}
              image={project.image} // Pass image to ProjectCard
              techStack={project.techStack} // Pass tech stack to ProjectCard
            />
          );
        })}
      </Canvas>

      {/* Navigation buttons */}
      {isInView && (
        <div className="absolute inset-0 flex items-center justify-between flex-col py-10 z-50"> {/* Ensure buttons are in front */}
          <button className="p-3 bg-gray-800 text-white rounded z-50" onClick={handlePreviousProject}>
            Up
          </button>
          <button className="p-3 bg-gray-800 text-white rounded z-50" onClick={handleNextProject}>
            Down
          </button>
        </div>
      )}
    </section>
  );
}
