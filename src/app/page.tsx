'use client';

import React from 'react';
import AboutMe from './sections/about';
import Projects from './sections/projects';
import OtherSection from './sections/otherSection';

export default function Home() {
  
  return (
    <div className="scroll-smooth">
      {/* About Me Section */}
      <AboutMe />

      {/* Projects Section */}
      <Projects />

      {/* Other Section */}
      <OtherSection />
    </div>
  );
}
