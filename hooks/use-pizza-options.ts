import { PizzaType, ProductItem } from '@prisma/client';
import React from 'react';
import { useSet } from 'react-use';

export type AvailableOptions<ValueType> = {
  value: ValueType;
  disabled: boolean;
};

interface ReturnProps {
  type: PizzaType;
  size: number;
  selectedItem: ProductItem;
  optionalIngredients: Set<number>;
  extraIngredients: Set<number>;
  availableSizes: AvailableOptions<number>[];
  availableTypes: AvailableOptions<PizzaType>[];
  setSize: (size: number) => void;
  toggleOptional: (key: number) => void;
  toggleExtra: (key: number) => void;
  onTypeChange: (newType: PizzaType) => void;
}

export const usePizzaOptions = (
  items: ProductItem[],
): ReturnProps => {
  const firstAvailableItem =
    items.find((i) => i.isAvailable) || items[0];

  const [type, setType] = React.useState<PizzaType>(
    firstAvailableItem.pizzaType!,
  );
  const [size, setSize] = React.useState<number>(
    firstAvailableItem.value,
  );

  const selectedItem = React.useMemo(() => {
    return (
      items.find(
        (i) => i.pizzaType === type && i.value === size,
      ) ||
      items.find(
        (i) => i.pizzaType === type && i.isAvailable,
      ) ||
      items[0]
    );
  }, [type, size, items]);

  const [optionalIngredients, { toggle: toggleOptional }] =
    useSet(new Set<number>());
  const [extraIngredients, { toggle: toggleExtra }] =
    useSet(new Set<number>());

  const availableSizes = items
    .filter((item) => item.pizzaType === type)
    .map((item) => ({
      value: item.value,
      disabled: !item.isAvailable,
    }));

  const availableTypes = Array.from(
    new Set(items.map((i) => i.pizzaType)),
  ).map((type) => ({
    value: type!,
    disabled: !items.some(
      (item) => item.pizzaType === type && item.isAvailable,
    ),
  }));

  const onTypeChange = (newType: PizzaType) => {
    setType(newType);

    const availableForType = items
      .filter(
        (item) =>
          item.pizzaType === newType && item.isAvailable,
      )
      .map((item) => item.value);

    if (!availableForType.includes(size)) {
      setSize(availableForType[0]);
    }
  };

  return {
    type,
    size,
    selectedItem,
    optionalIngredients,
    extraIngredients,
    availableSizes,
    availableTypes,
    setSize,
    toggleOptional,
    toggleExtra,
    onTypeChange,
  };
};
