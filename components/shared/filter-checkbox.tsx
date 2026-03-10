import React from 'react';
import { Checkbox } from '../ui';
import { CheckedState } from '@radix-ui/react-checkbox';

export interface FilterCheckboxProps {
  text: string;
  value: number;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: CheckedState) => void;
  checked?: boolean;
  name?: string;
}

export const FilterCheckbox: React.FC<
  FilterCheckboxProps
> = (props) => {
  const {
    text,
    value,
    endAdornment,
    onCheckedChange,
    checked,
    name,
  } = props;

  return (
    <div className="flex items-center gap-3">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className="size-6 cursor-pointer rounded-[8px]"
        id={`checkbox-${name}-${String(value)}`}
      />
      <label
        htmlFor={`checkbox-${name}-${String(value)}`}
        className="flex-1 cursor-pointer leading-none"
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
