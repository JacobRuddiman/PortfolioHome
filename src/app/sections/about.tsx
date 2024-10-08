'use client';

import React from 'react';

export default function AboutMe() {
  return (
    <section className="snap-start w-screen h-screen flex-shrink-0 flex items-center justify-center bg-gray-100 text-center p-10">
      <div>
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.
        </p>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.
        </p>
        <p className="mb-4">
          Fusce consectetur, nunc a aliquet condimentum, lectus magna auctor orci, ut ornare justo lacus ac lorem. Curabitur euismod nibh nec sem tincidunt, in convallis est blandit.
        </p>
        <p className="mb-4">
          Donec luctus semper est, eget porta eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed tincidunt dapibus felis, vitae interdum mauris.
        </p>
        {/* Add more paragraphs as needed */}
      </div>
    </section>
  );
}
