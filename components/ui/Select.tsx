import React from 'react';
import { ChevronDownIcon } from './Icons'; // Assuming you'll add ChevronDownIcon to Icons.tsx

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({ options, className = '', ...props }) => {
  const baseStyles =
    'block w-full pl-3 pr-10 py-2.5 text-base border-borderlight dark:border-borderdark focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT focus:border-primary-DEFAULT sm:text-sm rounded-md bg-surfacelight dark:bg-surfacedark text-textlight dark:text-textdark disabled:opacity-50 disabled:cursor-not-allowed appearance-none transition-colors duration-200 ease-in-out';

  return (
    <div className="relative">
      <select className={`${baseStyles} ${className}`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 dark:text-slate-400">
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </div>
  );
};