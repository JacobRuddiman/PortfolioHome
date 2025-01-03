'use client';
//Not being used
import React, { useState, useRef, useEffect } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { useSpring, a } from '@react-spring/three';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPrisma, SiPostgresql } from 'react-icons/si';

extend({ OrbitControls });

interface ProjectData {
  id: number;
  name: string;
  description: string;
  image: string;
  techStack: { icon: React.ElementType; color: string }[];
}

const projectData: ProjectData[] = [
  {
    id: 1,
    name: 'PromptBros',
    description: 'An AI-powered prompt management app.',
    image: '/images/promptbros.webp',
    techStack: [
      { icon: SiNextdotjs, color: 'text-gray-700' },
      { icon: SiTypescript, color: 'text-blue-600' },
      { icon: SiTailwindcss, color: 'text-teal-500' },
      { icon: SiPrisma, color: 'text-[#0C344B]' },
    ],
  },
  {
    id: 2,
    name: 'Plant Shop',
    description: 'An e-commerce platform for plants.',
    image: '/images/plantshop.png',
    techStack: [
      { icon: SiNextdotjs, color: 'text-gray-700' },
      { icon: SiPostgresql, color: 'text-blue-600' },
      { icon: SiTypescript, color: 'text-blue-600' },
      { icon: SiTailwindcss, color: 'text-teal-500' },
    ],
  },
];

interface ProjectCardProps {
  project: ProjectData;
  position: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
}

function ProjectCard({ project, position, isSelected, onClick }: ProjectCardProps) {
  const { camera } = useThree();
  const [ref, api] = useBox(() => ({ mass: 1, position, args: [12, 6, 0.3] }));
  const htmlRef = useRef<HTMLDivElement>(null);

  // Handle selection and deselection logic
  useEffect(() => {
    if (isSelected) {
      api.mass.set(0);
      api.position.set(0, 0, -camera.position.z / 2);
      api.rotation.set(0, 0, 0);
    } else {
      api.mass.set(1);

      // Generate new random position and rotation on deselection
      const newRandomPosition: [number, number, number] = [
        (Math.random() - 0.5) * 30,
        Math.random() * 20 + 10,
        (Math.random() - 0.5) * 20,
      ];
      const newRandomRotation: [number, number, number] = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];

      // Apply the random position and rotation
      api.position.set(...newRandomPosition);
      api.rotation.set(...newRandomRotation);
    }
  }, [isSelected, api, camera.position.z]);

  // Spring animation for scaling and centering when selected
  const { scale, pos, rot } = useSpring({
    scale: isSelected ? [2, 2, 2] : [1, 1, 1],
    pos: isSelected ? [0, 0, -camera.position.z / 2] : position,
    rot: isSelected ? [0, 0, 0] : ref.current?.rotation.toArray(),
    config: { tension: 300, friction: 30 },
  });

  useFrame(() => {
    if (ref.current && htmlRef.current) {
      const { x, y, z } = ref.current.position;
      htmlRef.current.style.transform = `translate3d(${x * 50}px, ${-y * 50}px, ${z * 50}px)`;
    }
  });

  return (
    <>
      <a.mesh ref={ref} position={pos} scale={scale} rotation={rot} onClick={onClick} castShadow>
        <boxGeometry args={[12, 6, 0.3]} />
        <meshStandardMaterial color="lightblue" />
      </a.mesh>
      <Html ref={htmlRef} as="div" center>
        <div className="flex w-48 h-24 border-2 bg-white border-gray-500 rounded">
          <div className="w-1/2 h-full flex flex-col justify-between p-2">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover rounded-br-lg" />
            <div className="flex justify-center space-x-2">
              {project.techStack.map(({ icon: IconComponent, color }, index) => (
                <IconComponent key={index} className={`text-xl ${color}`} />
              ))}
            </div>
          </div>
          <div className="w-1/2 h-full p-2 flex flex-col justify-between">
            <h2 className="text-left font-bold mb-2">{project.name}</h2>
            <p className="text-right text-xs">{project.description}</p>
          </div>
        </div>
      </Html>
    </>
  );
}

export default function ProjectSlideshow() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleSelect = (id: number) => {
    setSelectedId((prevSelected) => (prevSelected === id ? null : id));
  };

  return (
    <>
      <OrbitControls enablePan={false} enableRotate={true} maxPolarAngle={Math.PI / 2} />
      {projectData.map((project) => {
        const isSelected = selectedId === project.id;
        const randomPosition: [number, number, number] = [
          (Math.random() - 0.5) * 30,
          Math.random() * 20 + 10,
          (Math.random() - 0.5) * 20,
        ];

        return (
          <ProjectCard
            key={project.id}
            project={project}
            position={randomPosition}
            isSelected={isSelected}
            onClick={() => handleSelect(project.id)}
          />
        );
      })}
    </>
  );
}
