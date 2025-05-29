
import React from 'react';
import { KeyConfig } from '../types';

interface CalculatorKeyProps {
  keyConfig: KeyConfig;
  onClick: (id: KeyConfig['id']) => void;
}

const CalculatorKey: React.FC<CalculatorKeyProps> = ({ keyConfig, onClick }) => {
  const { id, label, displayLabel, className, span, theme = 'light-grey-black-text' } = keyConfig;

  let baseStyle = "font-semibold shadow-md focus:outline-none transition-all duration-100 ease-in-out";
  baseStyle += ` h-11 flex items-center justify-center text-sm sm:text-base rounded-md`; // Adjusted height and text size

  let bgColorClass = '';
  let textColorClass = '';

  // Theme-based styling
  switch (theme) {
    case 'light-grey-black-text':
      bgColorClass = 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500';
      textColorClass = 'text-black';
      break;
    case 'dark-grey-white-text':
      bgColorClass = 'bg-slate-500 hover:bg-slate-600 active:bg-slate-700';
      textColorClass = 'text-white';
      break;
    case 'light-grey-orange-text':
      bgColorClass = 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500';
      textColorClass = 'text-orange-500 font-bold';
      break;
    case 'light-grey-red-text':
      bgColorClass = 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500';
      textColorClass = 'text-red-500 font-bold';
      break;
    case 'light-grey-blue-text':
      bgColorClass = 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500';
      textColorClass = 'text-blue-600 font-semibold';
      break;
    case 'blue-white-text': // EXE key
      bgColorClass = 'bg-sky-500 hover:bg-sky-600 active:bg-sky-700';
      textColorClass = 'text-white';
      break;
    default: // Fallback to light grey
      bgColorClass = 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500';
      textColorClass = 'text-black';
  }
  
  const colSpanClass = span ? `col-span-${span}` : 'col-span-1';

  // className from KeyConfig can override base styles
  const finalClassName = `${baseStyle} ${bgColorClass} ${textColorClass} ${colSpanClass} ${className || ''}`;

  return (
    <button
      id={`key-${id}`}
      onClick={() => onClick(id)}
      className={finalClassName}
    >
      {displayLabel || label}
    </button>
  );
};

export default CalculatorKey;
