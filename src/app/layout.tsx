import React, { ReactNode } from 'react';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'My Portfolio',
  description: 'A dynamic portfolio site',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">{children}</body>
    </html>
  );
}
