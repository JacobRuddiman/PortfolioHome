'use client';

import React, { useState } from 'react';

interface TechIconProps {
  name: string;
  IconComponent: React.ElementType;
  projects: string[];
  color: string;
}

export default function TechIcon({ name, IconComponent, projects, color }: TechIconProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center relative"
    >
      {/* Icon and Label */}
      <IconComponent className={`text-6xl ${color}`} /> {/* Moderate icon size */}
      <p className="mt-2 text-xl">{name}</p> {/* Moderate text size */}

      {/* Pop-up with project list below the icon */}
      <div
        className={`absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80 z-50 transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0 delay-200'
        }`} 
        style={{ top: '90px', pointerEvents: hovered ? 'auto' : 'none' }} // Positioned further below the icon
      >
        <h2 className="text-xl font-semibold mb-2">Projects using {name}:</h2>
        <ul className="list-disc list-inside">
          {projects.map((project, index) => (
            <li key={index} className="text-lg">
              <a href={`#${project}`} className="hover:underline">{project}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
