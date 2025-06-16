
import React from 'react';
import { XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon as SuccessIcon } from './Icons'; // Renamed for clarity

interface AlertProps {
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const baseClasses = "p-4 mb-4 text-sm rounded-lg flex items-start justify-between animate-fadeInDown"; // items-start for better long message alignment
  const typeClasses = {
    error: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600",
    success: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600",
    warning: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-600",
    info: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-600",
  };

  const IconComponent = () => {
    const iconBaseClass = "w-5 h-5 inline mr-2 flex-shrink-0"; // flex-shrink-0 to prevent icon from shrinking
    switch(type) {
      case 'error': return <XCircleIcon className={`${iconBaseClass} text-red-500 dark:text-red-400`}/>;
      case 'success': return <SuccessIcon className={`${iconBaseClass} text-green-500 dark:text-green-400`}/>;
      case 'warning': return <ExclamationTriangleIcon className={`${iconBaseClass} text-yellow-500 dark:text-yellow-400`}/>;
      default: return <InformationCircleIcon className={`${iconBaseClass} text-blue-500 dark:text-blue-400`}/>;
    }
  };
  
  const closeButtonColors = {
    error: "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200 focus:ring-red-400",
    success: "text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-200 focus:ring-green-400",
    warning: "text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-200 focus:ring-yellow-400",
    info: "text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 focus:ring-blue-400",
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      <div className="flex items-start"> {/* Wrapper for icon and message */}
        <IconComponent/>
        <div> {/* Wrapper for text content to allow it to wrap */}
          <span className="font-semibold">{type.charAt(0).toUpperCase() + type.slice(1)}:</span> {message}
        </div>
      </div>
      {onClose && (
        <button 
          onClick={onClose} 
          className={`ml-3 -mr-1 -mt-1 p-1.5 rounded-md focus:ring-2 inline-flex items-center justify-center h-8 w-8 transition-colors ${closeButtonColors[type]}`}
          aria-label="Close"
        >
          <XCircleIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};