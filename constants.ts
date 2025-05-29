
import { CalculatorMode, KeyConfig } from './types';

export const INITIAL_MODE: CalculatorMode = CalculatorMode.COMP;
export const MAX_DISPLAY_LENGTH = 20; // Arbitrary max length for display for now

// Casio FC-100V Key Layout for a 5-column grid
// KeyConfig items represent actual keys. 'null' represents an empty space in the grid.
export const KEY_LAYOUT: (KeyConfig | null)[][] = [
  // Row 1: Mode Keys
  [
    { id: 'COMP', label: 'COMP', type: 'mode', theme: 'light-grey-blue-text' },
    { id: 'SMPL', label: 'SMPL', type: 'mode', theme: 'light-grey-blue-text' },
    { id: 'CMPD', label: 'CMPD', type: 'mode', theme: 'light-grey-blue-text' },
    { id: 'CASH', label: 'CASH', type: 'mode', theme: 'light-grey-blue-text' },
    { id: 'AMRT', label: 'AMRT', type: 'mode', theme: 'light-grey-blue-text' },
  ],
  // Row 2: Top Controls & D-Pad
  [
    { id: 'SHIFT', label: 'SHIFT', type: 'control', theme: 'light-grey-orange-text', className: 'text-xs rounded-full' },
    { id: 'ALPHA', label: 'ALPHA', type: 'control', theme: 'light-grey-red-text', className: 'text-xs rounded-full' },
    null, // Spacer for D-pad alignment
    { id: 'UP', label: '▲', displayLabel: '▲', type: 'control', theme: 'dark-grey-white-text', className: 'rounded-full h-10 text-base flex items-center justify-center' },
    { id: 'ON', label: 'ON', type: 'control', theme: 'dark-grey-white-text', className: 'rounded-full' },
  ],
  // Row 3: Mid Controls & D-Pad
  [
    { id: 'SOLVE_KEY', label: 'SOLVE', type: 'action', theme: 'dark-grey-white-text' }, 
    { id: 'RCL_KEY', label: 'RCL', type: 'action', theme: 'dark-grey-white-text' },  
    { id: 'LEFT', label: '◀', displayLabel: '◀', type: 'control', theme: 'dark-grey-white-text', className: 'rounded-full h-10 text-base flex items-center justify-center' },
    null, // Spacer for D-pad center (REPLAY text would be around here)
    { id: 'RIGHT', label: '▶', displayLabel: '▶', type: 'control', theme: 'dark-grey-white-text', className: 'rounded-full h-10 text-base flex items-center justify-center' },
  ],
  // Row 4: Low Controls & D-Pad
  [
    { id: 'L_PAREN', label: '(', type: 'operator', theme: 'dark-grey-white-text' }, 
    { id: 'R_PAREN', label: ')', type: 'operator', theme: 'dark-grey-white-text' }, 
    { id: 'M_PLUS', label: 'M+', type: 'action', theme: 'dark-grey-white-text' },    
    { id: 'DOWN', label: '▼', displayLabel: '▼', type: 'control', theme: 'dark-grey-white-text', className: 'rounded-full h-10 text-base flex items-center justify-center' },
    { id: 'MODE', label: 'MODE', type: 'mode', theme: 'dark-grey-white-text', className: 'rounded-full' },
  ],
  // Row 5: Financial Keys (Set 1) & Top-Right Action Keys
  [
    { id: 'N', label: 'n', type: 'action', theme: 'dark-grey-white-text' }, 
    { id: 'IYR', label: 'I%YR', type: 'action', theme: 'dark-grey-white-text' }, 
    { id: 'PV', label: 'PV', type: 'action', theme: 'dark-grey-white-text' },   
    { id: 'DEL', label: 'DEL', type: 'action', theme: 'dark-grey-white-text' }, 
    { id: 'AC', label: 'AC', type: 'action', theme: 'dark-grey-white-text' },  
  ],
  // Row 6: Financial Keys (Set 2), Percent & Multiply/Divide Operators
  [
    { id: 'PMT', label: 'PMT', type: 'action', theme: 'dark-grey-white-text' }, 
    { id: 'FV', label: 'FV', type: 'action', theme: 'dark-grey-white-text' },   
    { id: 'PERCENT_KEY', label: '%', type: 'operator', theme: 'light-grey-black-text' }, 
    { id: '*', label: '×', displayLabel: '×', type: 'operator', theme: 'light-grey-black-text' },
    { id: '/', label: '÷', displayLabel: '÷', type: 'operator', theme: 'light-grey-black-text' },
  ],
  // Row 7: Numbers (7-9) & Add/Subtract Operators
  [
    { id: '7', label: '7', type: 'number', theme: 'light-grey-black-text' },
    { id: '8', label: '8', type: 'number', theme: 'light-grey-black-text' },
    { id: '9', label: '9', type: 'number', theme: 'light-grey-black-text' },
    { id: '+', label: '+', type: 'operator', theme: 'light-grey-black-text' },
    { id: '-', label: '−', displayLabel: '−', type: 'operator', theme: 'light-grey-black-text' },
  ],
  // Row 8: Numbers (4-6), Spacers to align with 5-column grid
  [
    { id: '4', label: '4', type: 'number', theme: 'light-grey-black-text' },
    { id: '5', label: '5', type: 'number', theme: 'light-grey-black-text' },
    { id: '6', label: '6', type: 'number', theme: 'light-grey-black-text' },
    null, 
    null, 
  ],
  // Row 9: Numbers (1-3), Spacers
  [
    { id: '1', label: '1', type: 'number', theme: 'light-grey-black-text' },
    { id: '2', label: '2', type: 'number', theme: 'light-grey-black-text' },
    { id: '3', label: '3', type: 'number', theme: 'light-grey-black-text' },
    null, 
    null, 
  ],
  // Row 10: Numbers (0, .), EXP, Ans & EXE
  [
    { id: '0', label: '0', type: 'number', theme: 'light-grey-black-text' },
    { id: '.', label: '.', type: 'number', theme: 'light-grey-black-text' }, 
    { id: 'EXP', label: 'EXP', type: 'action', theme: 'light-grey-black-text' }, 
    { id: 'ANS', label: 'Ans', type: 'action', theme: 'light-grey-black-text' },
    { id: 'EXE', label: 'EXE', type: 'equals', theme: 'blue-white-text' }, 
  ],
];
