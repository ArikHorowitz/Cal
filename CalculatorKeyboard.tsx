
import React from 'react';
import { KeyConfig, KeyId } from '../types';
import { KEY_LAYOUT } from '../constants';
import CalculatorKey from './CalculatorKey';

interface CalculatorKeyboardProps {
  onKeyPress: (keyId: KeyId) => void;
}

const CalculatorKeyboard: React.FC<CalculatorKeyboardProps> = ({ onKeyPress }) => {
  return (
    <div className="grid grid-cols-5 gap-2 w-full">
      {KEY_LAYOUT.flat().map((keyConfigOrNull, index) => {
        if (keyConfigOrNull) {
          // It's a KeyConfig object
          return (
            <CalculatorKey
              key={keyConfigOrNull.id}
              keyConfig={keyConfigOrNull}
              onClick={onKeyPress}
            />
          );
        } else {
          // It's a null spacer, render an empty div to maintain grid structure
          // The key is important for React's list rendering
          return <div key={`spacer-${index}`} className="col-span-1" />;
        }
      })}
    </div>
  );
};

export default CalculatorKeyboard;
