import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-surfacelight dark:bg-surfacedark shadow-custom-lg dark:shadow-custom-lg-dark rounded-xl border border-borderlight dark:border-borderdark transition-all duration-300 ease-in-out hover:shadow-custom-xl dark:hover:shadow-custom-xl-dark ${className}`}
    >
      {children}
    </div>
  );
};