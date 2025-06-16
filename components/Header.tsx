
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import { SparklesIcon } from './ui/Icons'; // Assuming you have an icons file

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-surfacelight dark:bg-surfacedark shadow-md sticky top-0 z-50 transition-colors duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="w-8 h-8 text-primary-DEFAULT" />
          <h1 className="text-2xl font-bold text-primary-DEFAULT">
            Prompt Lumi
          </h1>
        </div>
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </header>
  );
};
