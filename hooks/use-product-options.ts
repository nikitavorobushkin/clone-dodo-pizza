import { ProductItem } from '@prisma/client';
import React from 'react';
import { AvailableOptions } from '@/hooks/use-pizza-options';

interface ReturnProps {
  unitValue: number;
  setUnitValue: (size: number) => void;
  selectedItem: ProductItem;
  availableValues: AvailableOptions<number>[];
}

export const useProductOptions = (
  items: ProductItem[],
): ReturnProps => {
  const firstAvailableItem = items[0];

  const [unitValue, setUnitValue] = React.useState<number>(
    firstAvailableItem.value as number,
  );

  const selectedItem = React.useMemo(() => {
    return (
      items.find((item) => item.value === unitValue) ||
      items[0]
    );
  }, [items, unitValue]);

  const availableValues = items.map((item) => ({
    value: item.value,
    disabled: !item.isAvailable,
  }));

  return {
    unitValue,
    setUnitValue,
    availableValues,
    selectedItem,
  };
};
