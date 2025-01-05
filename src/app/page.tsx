'use client';

import React from 'react';
import AboutMe from './sections/about';
import Projects from './sections/projects';
import OtherSection from './sections/otherSection';

export default function Home() {
  
  return (
    <div className="scroll-smooth bg-gradient-to-b from-black via-purple-500
               to-gray-800  text-white">
      {/* About Me Section */}
      <AboutMe />

      {/* Projects Section */}
      <Projects />

      {/* Other Section */}
      <OtherSection />
    </div>
  );
}
