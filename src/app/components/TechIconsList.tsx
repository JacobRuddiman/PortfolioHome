'use client';

import React from 'react';
import { FaReact, FaPython, FaNodeJs } from 'react-icons/fa';
import { SiNextdotjs, SiPostgresql, SiTypescript, SiTailwindcss } from 'react-icons/si';
import TechIcon from './TechIcon';
import PrismaIcon from '../icons/prisma-3.svg'; // Import Prisma SVG

// Tech icons and the projects they are used in
const techIcons = [
  {
    name: 'React',
    IconComponent: FaReact,
    color: 'text-blue-500',
    projects: ['PromptBros', 'Plant Shop Front'],
  },
  {
    name: 'Next.js',
    IconComponent: SiNextdotjs,
    color: 'text-gray-700',
    projects: ['PromptBros', 'Plant Shop Front'],
  },
  {
    name: 'Python',
    IconComponent: FaPython,
    color: 'text-yellow-500',
    projects: [],
  },
  {
    name: 'Node.js',
    IconComponent: FaNodeJs,
    color: 'text-green-500',
    projects: ['PromptBros', 'Plant Shop Front'],
  },
  {
    name: 'PostgreSQL',
    IconComponent: SiPostgresql,
    color: 'text-blue-500',
    projects: ['Plant Shop Front'],
  },
  {
    name: 'TypeScript',
    IconComponent: SiTypescript,
    color: 'text-blue-600',
    projects: ['PromptBros', 'Plant Shop Front'],
  },
  {
    name: 'Tailwind CSS',
    IconComponent: SiTailwindcss,
    color: 'text-teal-500',
    projects: ['PromptBros', 'Plant Shop Front'],
  },
  {
    name: 'Prisma',
    IconComponent: () => <PrismaIcon className="w-16 h-16 text-gray-700" />,
    color: 'text-gray-700',
    projects: ['PromptBros'],
  },
];

export default function TechIconsList() {
  return (
    <div className="grid grid-cols-4 gap-8"> {/* 4 columns grid with gaps between icons */}
      {techIcons.map((tech, index) => (
        <div
          key={index}
          className="flex items-center justify-center w-32 h-32" // Container with fixed size for alignment
        >
          <TechIcon
            name={tech.name}
            IconComponent={tech.IconComponent}
            projects={tech.projects}
            color={tech.color}
          />
        </div>
      ))}
    </div>
  );
}
