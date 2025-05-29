
export enum CalculatorMode {
  COMP = 'COMP',
  SMPL = 'SMPL',
  CMPD = 'CMPD',
  CASH = 'CASH',
  AMRT = 'AMRT',
  // Add other modes as they are implemented
}

export type KeyId = 
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.'
  | '+' | '-' | '*' | '/' | '='
  | 'AC' | 'DEL' | 'MODE' | 'SHIFT' | 'ALPHA' | 'ON'
  | 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
  // Financial keys and other specific keys will be added later
  | 'N' | 'IYR' | 'PV' | 'PMT' | 'FV' 
  | 'EXE' // Common execute key
  | 'EXP' // Added EXP key
  | 'ANS' // Added ANS key
  // Added missing KeyIds from constants.ts
  | 'COMP' | 'SMPL' | 'CMPD' | 'CASH' | 'AMRT' // Mode keys also used as IDs
  | 'SOLVE_KEY' // Changed from ESC_KEY
  | 'RCL_KEY'   // Changed from STO_KEY
  | 'L_PAREN'
  | 'R_PAREN'
  | 'M_PLUS'
  | 'PERCENT_KEY';

// Describes the visual theme of a key, aligning with FC-100V appearance
export type KeyTheme =
  | 'light-grey-black-text'   // Numbers, standard operators, some control keys
  | 'dark-grey-white-text'    // Financial vars, most function keys, D-pad, ON, AC, DEL
  | 'light-grey-orange-text'  // SHIFT key
  | 'light-grey-red-text'     // ALPHA key
  | 'light-grey-blue-text'    // Top row mode keys (COMP, SMPL, etc.)
  | 'blue-white-text';        // EXE key

export interface KeyConfig {
  id: KeyId;
  label: string; // Text on the key
  displayLabel?: string; // Visual representation, e.g. for icons or special chars
  className?: string; // Additional Tailwind classes for styling
  span?: number; // For keys spanning multiple columns in the grid
  type?: 'number' | 'operator' | 'action' | 'mode' | 'control' | 'equals';
  theme?: KeyTheme; // Defines the color scheme of the key
}
