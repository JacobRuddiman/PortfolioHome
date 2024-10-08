'use client';

import React from 'react';
import ProjectsCarousel from '../components/ProjectsCarousel';

export default function Projects() {
  return (
    <section className="snap-start w-screen h-screen flex-shrink-0 flex items-center justify-center bg-gray-200 text-center p-10">
      <div>
        <ProjectsCarousel/>
      </div>
    </section>
  );
}
