import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: React.FC<TextAreaProps> = ({ className = '', ...props }) => {
  const baseStyles =
    'block w-full p-2.5 text-sm border-borderlight dark:border-borderdark focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent rounded-md bg-surfacelight dark:bg-surfacedark text-textlight dark:text-textdark placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out';

  return <textarea className={`${baseStyles} ${className}`} {...props} />;
};