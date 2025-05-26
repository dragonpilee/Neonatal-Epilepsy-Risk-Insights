
import React from 'react';
import { BrainIcon } from './Icons'; // Assuming Icons.tsx will be created

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md shadow-lg py-6 sticky top-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4 flex items-center justify-center md:justify-start">
        <BrainIcon className="h-10 w-10 md:h-12 md:w-12 text-sky-400 mr-3 md:mr-4" />
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
          {title}
        </h1>
      </div>
    </header>
  );
};
