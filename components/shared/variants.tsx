'use client';

import { cn } from '@/lib/utils';
import React from 'react';

export type Variant<ValueType> = {
  name: string;
  value: ValueType;
  disabled?: boolean;
};

interface Props<ValueType> {
  items: readonly Variant<ValueType>[];
  value: ValueType;
  onClick?: (value: ValueType) => void;
  className?: string;
}

export const Variants = <ValueType,>({
  items,
  value,
  onClick,
  className,
}: Props<ValueType>) => {
  return (
    <div
      className={cn(
        className,
        'flex justify-between rounded-3xl bg-[#F3F3F7] p-1 select-none',
      )}
    >
      {items.map((item) => (
        <button
          className={cn(
            'flex h-[30px] flex-1 cursor-pointer items-center justify-center rounded-3xl px-5 text-sm transition-all duration-400',
            {
              'bg-white shadow':
                item.value === value && items.length !== 1,
              'cursor-not-allowed text-gray-500 opacity-50':
                item.disabled,
            },
          )}
          disabled={item.disabled}
          onClick={() => onClick?.(item.value)}
          key={String(item.value)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
