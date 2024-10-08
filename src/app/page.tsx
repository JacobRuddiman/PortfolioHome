import React from 'react';
import AboutMe from './sections/about';
import Projects from './sections/projects';
import OtherSection from './sections/otherSectoin';

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-x-scroll flex snap-x snap-mandatory">
      {/* About Me Section */}
      <AboutMe />
      
      {/* Projects Section */}
      <Projects />
      
      {/* Other Section */}
      <OtherSection />
    </div>
  );
}
