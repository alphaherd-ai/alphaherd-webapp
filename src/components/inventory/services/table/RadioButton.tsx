// components/RadioButton.tsx
import React from 'react';

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="form-radio text-zinc-300 bg-zinc-300"
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
