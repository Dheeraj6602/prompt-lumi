
import React from 'react';
import { SunIcon, MoonIcon } from './ui/Icons'; // Assuming you have an icons file

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT focus:ring-opacity-50 transition-all duration-200 ease-in-out"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <SunIcon className="w-6 h-6 text-yellow-400 transition-colors duration-200 ease-in-out" />
      ) : (
        <MoonIcon className="w-6 h-6 text-slate-600 transition-colors duration-200 ease-in-out" />
      )}
    </button>
  );
};