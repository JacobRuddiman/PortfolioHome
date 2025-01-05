import React, { useState } from 'react';

// Projects Component
export default function Projects() {
  const [projects] = useState([
    {
      id: 1,
      title: 'PromptBros',
      description: 'An AI content management system I interned at, in which I focused on building the admin management interface and , gaining hands-on experience in creating web applications for real users.',
      image: '/images/card_image1.png',
      link: 'https://example.com/project-one',
    },
    {
      id: 2,
      title: 'Plant Shop',
      description: 'A responsive storefront for a plant shop built with Next.js and Postgres. This project helped me refine my coding practices and focus on building scalable, maintainable web solutions.',
      image: '/images/card_image2.png',
      link: 'https://example.com/project-two',
    },
  ]);

  return (
    <section className="snap-start w-screen min-h-screen flex flex-col items-center justify-center p-10">
      <div className="flex flex-col gap-20 w-full">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center w-full h-64 gap-10`}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full w-auto"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-auto object-cover rounded-lg"
              />
            </a>
            <div className={`flex flex-col md:w-2/3 p-5 bg-white rounded-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}` }>
              <h3 className="text-gray-900 text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-700 mb-4">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}