'use client';
import React from 'react';
import { Variants } from '@/components/shared';
import { formatSize } from '@/lib/format-size';
import { formatPizzaType } from '@/lib/format-pizza-type';
import { PizzaType, ProductUnit } from '@prisma/client';

interface Props {
  sizes: { value: number; disabled: boolean }[];
  typeOptions: { value: PizzaType; disabled: boolean }[];
  size: number;
  type: PizzaType;
  setSize: (v: number) => void;
  setType: (t: PizzaType) => void;
}

export const PizzaVariants: React.FC<Props> = ({
  sizes,
  typeOptions,
  size,
  type,
  setSize,
  setType,
}) => {
  return (
    <div className="mt-5 flex flex-col gap-5">
      <Variants
        items={sizes.map((size) => ({
          ...size,
          name: formatSize(size.value, ProductUnit.CM),
        }))}
        value={size}
        onClick={setSize}
      />

      <Variants
        items={typeOptions.map((type) => ({
          ...type,
          name: formatPizzaType(type.value),
        }))}
        value={type}
        onClick={setType}
      />
    </div>
  );
};
