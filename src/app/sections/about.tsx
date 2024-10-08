'use client';

import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import TechIconsList from '../components/TechIconsList';

export default function AboutMe() {
  return (
    <section className="snap-start w-screen h-screen flex-shrink-0 flex flex-col items-center justify-around bg-gray-100 text-center p-10">
      {/* Header and Social Media Links as a vertical flexbox */}
      <div className="flex flex-col items-center space-y-8">
        {/* Header */}
        <header className="flex flex-col items-center">
          <h1 className="text-7xl font-bold mb-4">Jacob's Portfolio</h1> {/* Bigger font size */}
          <p className="text-3xl mb-2">Location: Your City, Country</p> {/* Larger text */}
          <p className="text-2xl">Contact: your-email@example.com</p> {/* Larger text */}
        </header>

        {/* Social Media Links - Icons remain horizontally aligned */}
        <div className="flex space-x-8">
          <a href="https://github.com/JacobRuddiman" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-6xl text-black hover:text-gray-600" /> {/* Larger GitHub icon */}
          </a>
          <a href="https://linkedin.com/in/jacobruddiman" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-6xl text-blue-600 hover:text-blue-800" /> {/* Larger LinkedIn icon */}
          </a>
        </div>
      </div>

      {/* Technology Icons List */}
      <TechIconsList />

      {/* About Me Text */}
      <div className="mt-10">
        <p className="text-xl mb-4">
          I’m a full-stack developer with expertise in React, Next.js, Python, and Node.js. I enjoy building scalable web applications and solving complex technical problems.
        </p>
        <p className="text-xl mb-4">
          My passion for software development has driven me to constantly learn and adopt new technologies, enabling me to deliver efficient and effective solutions in a variety of projects.
        </p>
      </div>
    </section>
  );
}
