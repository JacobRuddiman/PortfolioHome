'use client';

import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import TechIconsList from '../components/TechIconsList';

export default function AboutMe() {
  return (
    <section className="snap-start w-screen h-screen flex-shrink-0 flex flex-col items-center justify-around text-center p-10">
      <div className="flex flex-row items-center w-full space-x-10">
        {/* Left Column: Header, Social Links, and Tech Icons */}
        <div className="flex flex-col items-center w-2/3 space-y-8 ">
          {/* Header and Social Media Links */}
          <div className="flex flex-col items-center space-y-4">
            <header className="flex flex-col items-center">
              <h1 className="text-5xl font-bold mb-2">Jacob Ruddiman</h1>
              <a href="mailto:jacobruddiman@gmail.com" className="text-2xl">
                jacobruddiman@gmail.com
              </a>
            </header>
            <div className="flex space-x-4">
              <a href="https://github.com/JacobRuddiman" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-6xl text-black hover:text-gray-600" />
              </a>
              <a href="https://linkedin.com/in/jacobruddiman" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-6xl text-blue-600 hover:text-blue-800" />
              </a>
            </div>
          </div>

          {/* Technology Icons */}
          <TechIconsList />
        </div>

        {/* Right Column: About Me Text and Profile Picture */}
        <div className="flex flex-col items-center w-1/3 space-y-4">
          <img
            src="/images/profile_pic.png" // Path to profile picture
            alt="Profile Picture of Jacob Ruddiman"
            className="rounded-full w-48 h-48 object-cover shadow-lg mx-auto"
          />
          <p className="text-lg text-center">
            I&#39;ve been coding for the past 7 years or so, based near Southampton in the UK. I&#39;ve
            found myself working across both web development professionally and machine learning personal projects.
          </p>
        </div>
      </div>
    </section>
  );
}