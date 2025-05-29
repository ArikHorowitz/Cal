import React from 'react';

interface CalculatorDisplayProps {
  /** Text for Line 1 (e.g., mode, status indicators) */
  line1Text?: string;
  /** Text for Line 2 (e.g., auxiliary display, formula) */
  line2Text?: string;
  /** Text for Line 3 (e.g., main number input or result) */
  line3Text?: string;
  /** Text for Line 4 (e.g., context, "Ans=") */
  line4Text?: string;
  /** Whether to show a blinking cursor on Line 3 */
  showCursorOnLine3?: boolean;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  line1Text = "COMP",
  line2Text = "",
  line3Text = "0",
  line4Text = "",
  showCursorOnLine3 = false,
}) => {
  return (
    <div 
      className="bg-neutral-500 p-0.5 rounded-sm shadow-inner w-full max-w-[270px]" // Outer silver bezel
      aria-label="Calculator Screen Bezel"
    >
      <div
        className="bg-cyan-800 text-lime-300 rounded-[1px] px-2 py-1 min-h-[100px] w-full calculator-display-font tracking-wider flex flex-col justify-between border border-neutral-900" // Darker LCD background, inner border, increased height
        aria-label="Calculator Screen"
      >
        {/* Line 1: Mode Label & Indicators */}
        <div
          className="text-xs text-right whitespace-nowrap overflow-x-hidden h-5 flex items-center justify-end opacity-80"
          aria-label="Calculator Mode and Status"
        >
          <span>{line1Text}</span>
        </div>

        {/* Line 2: Auxiliary Display */}
        <div
          className="text-sm text-left whitespace-nowrap overflow-x-auto h-6 flex items-center"
          aria-label="Auxiliary display"
        >
          <span className="inline-block w-full">{line2Text}</span>
        </div>

        {/* Line 3: Main Readout Area */}
        <div
          className="text-xl text-left overflow-hidden h-8 flex items-center" // Adjusted font size and height for main display
          aria-label="Calculator main readout"
          role="status" 
          aria-live="polite" 
        >
          <div className="whitespace-nowrap overflow-x-auto w-full">
            <span className="inline-block">
              {line3Text}
              {showCursorOnLine3 && <span className="animate-pulse ml-0.5 inline-block bg-lime-300 w-2 h-6 opacity-90"></span>} {/* Block cursor */}
            </span>
          </div>
        </div>
        
        {/* Line 4: Bottom Context Line */}
        <div
          className="text-sm text-left whitespace-nowrap overflow-x-auto h-6 flex items-center"
          aria-label="Context display"
        >
           <span className="inline-block w-full">{line4Text}</span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorDisplay;