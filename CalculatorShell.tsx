import React, { useState, useCallback } from 'react';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorKeyboard from './CalculatorKeyboard';
import { CalculatorMode, KeyId } from '../types';
import { INITIAL_MODE, MAX_DISPLAY_LENGTH } from '../constants';

const CalculatorShell: React.FC = () => {
  const [mainDisplay, setMainDisplay] = useState<string>("0");
  const [auxDisplay, setAuxDisplay] = useState<string>(""); // This will be Line 2
  const [line4Display, setLine4Display] = useState<string>(""); // For Line 4
  const [currentMode, setCurrentMode] = useState<CalculatorMode>(INITIAL_MODE);
  const [isError, setIsError] = useState<boolean>(false);
  const [shiftActive, setShiftActive] = useState<boolean>(false);
  const [alphaActive, setAlphaActive] = useState<boolean>(false);

  const resetInput = useCallback(() => {
    setMainDisplay("0");
    setAuxDisplay("");
    setLine4Display("");
    setIsError(false);
  }, []);

  const handleKeyPress = useCallback((keyId: KeyId) => {
    if (isError && keyId !== 'AC' && keyId !== 'ON') {
      return;
    }

    if (keyId === 'SHIFT') {
      setShiftActive(prev => !prev);
      setAlphaActive(false); 
      return;
    }
    if (keyId === 'ALPHA') {
      setAlphaActive(prev => !prev);
      setShiftActive(false); 
      return;
    }

    const deactivateModifiers = !['SHIFT', 'ALPHA'].includes(keyId);

    switch (keyId) {
      case 'AC':
        resetInput();
        break;
      case 'ON':
        resetInput();
        setCurrentMode(INITIAL_MODE);
        break;
      case 'DEL':
        if (mainDisplay.length > 1) {
          setMainDisplay(mainDisplay.slice(0, -1));
        } else if (mainDisplay !== "0") {
          setMainDisplay("0");
        }
        // No change to auxDisplay or line4Display on DEL for now
        break;
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
        if (mainDisplay.length < MAX_DISPLAY_LENGTH) {
          setMainDisplay(prev => (prev === "0" && keyId !== '0' ? keyId : prev === "0" && keyId === '0' ? "0" : prev + keyId));
        }
        break;
      case '.':
        if (mainDisplay.length < MAX_DISPLAY_LENGTH && !mainDisplay.includes('.')) {
          setMainDisplay(prev => prev + '.');
        }
        break;
      case '+': case '-': case '*': case '/':
        if (mainDisplay.length < MAX_DISPLAY_LENGTH - 3 && mainDisplay !== "Error") {
             const operatorSymbol = keyId === '*' ? '×' : keyId === '/' ? '÷' : keyId;
             // Append current input and operator to auxDisplay (Line 2)
             setAuxDisplay(prev => prev + mainDisplay + ` ${operatorSymbol} `);
             setMainDisplay("0"); // Reset mainDisplay (Line 3) for next input
        }
        break;
      case '=':
        if (auxDisplay && mainDisplay !== "Error") {
            // For now, just show "Result" on Line 3, and the expression ending with = on Line 2
            setAuxDisplay(prev => prev + mainDisplay + " =");
            setMainDisplay("Result"); // Placeholder for actual result on Line 3
            // Potentially update Line 4 with "Ans = Result" in future
            setLine4Display("Ans = Result"); 
            setIsError(false);
        }
        break;
      case 'MODE':
        // For now, just indicate mode change attempt on auxDisplay (Line 2)
        const modes = Object.values(CalculatorMode);
        const currentIndex = modes.indexOf(currentMode);
        const nextMode = modes[(currentIndex + 1) % modes.length];
        setCurrentMode(nextMode);
        setAuxDisplay(`Mode set to ${nextMode}`); // Show mode change on Line 2
        setMainDisplay("0"); // Clear main display
        setLine4Display(""); // Clear line 4 on mode change
        break;
      case 'SOLVE_KEY':
      case 'RCL_KEY':
        console.log("Key pressed:", keyId, "Shift:", shiftActive, "Alpha:", alphaActive);
        setAuxDisplay(`${keyId} pressed (Shift: ${shiftActive}, Alpha: ${alphaActive})`); // Show on Line 2
        setLine4Display("");
        break;
      default:
        console.log("Key pressed:", keyId, "Shift:", shiftActive, "Alpha:", alphaActive);
    }

    if (deactivateModifiers) {
        setShiftActive(false);
        setAlphaActive(false);
    }
  }, [mainDisplay, auxDisplay, currentMode, isError, resetInput, shiftActive, alphaActive]);

  const activeIndicators: string[] = [];
  if (shiftActive) activeIndicators.push("SHIFT");
  if (alphaActive) activeIndicators.push("ALPHA");

  const line1Text = [currentMode, ...activeIndicators].filter(Boolean).join(' ');

  return (
    <div className="bg-neutral-800 p-3 sm:p-3.5 rounded-lg shadow-2xl w-full max-w-[300px] flex flex-col items-center gap-3 border border-black">
      {/* Branding Area - Top */}
      <div className="w-full px-1.5 flex justify-between items-center">
        <h2 className="text-sm font-bold text-gray-300">CASIO</h2>
        <p className="text-[0.6rem] font-semibold text-gray-400 tracking-wide">FC-100V</p>
      </div>
      
      <CalculatorDisplay 
        line1Text={line1Text}
        line2Text={auxDisplay}
        line3Text={isError ? "Error" : mainDisplay}
        line4Text={line4Display} // Pass the new line4Display state
        showCursorOnLine3={true}
      />
      
      {/* Branding Area - Below Display */}
      <div className="w-full text-center -mt-1 mb-1">
        <p className="text-[0.6rem] font-semibold text-amber-300 tracking-wider">FINANCIAL CONSULTANT</p>
      </div>

      {/* REPLAY text above D-Pad area */}
      <div className="w-full px-1.5 flex justify-center items-center -mb-1.5">
         <span className="text-[0.55rem] text-gray-400 font-semibold">REPLAY</span>
      </div>

      <div className="w-full px-1">
        <CalculatorKeyboard onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
};

export default CalculatorShell;