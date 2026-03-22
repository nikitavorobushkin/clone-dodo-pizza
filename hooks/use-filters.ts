'use client';

import React from 'react';
import { useSet } from 'react-use';
import { useSearchParams } from 'next/navigation';
import { PizzaType } from '@prisma/client';

export interface ReturnProps extends Filters {
  toggleIngredients: (id: number) => void;
  togglePizzaTypes: (type: PizzaType) => void;
  toggleSizes: (id: number) => void;
  setPrices: React.Dispatch<
    React.SetStateAction<PricesProps>
  >;
}

interface PricesProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface Filters {
  selectedIngredients: Set<number>;
  selectedPizzaTypes: Set<PizzaType>;
  selectedPizzaSizes: Set<number>;
  prices: PricesProps;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();

  const priceFrom = searchParams.get('priceFrom');
  const priceTo = searchParams.get('priceTo');

  const [prices, setPrices] = React.useState<PricesProps>({
    priceFrom: priceFrom ? Number(priceFrom) : undefined,
    priceTo: priceTo ? Number(priceTo) : undefined,
  });

  const [
    selectedIngredients,
    { toggle: toggleIngredients },
  ] = useSet(
    new Set<number>(
      searchParams
        .get('ingredients')
        ?.split(',')
        .map(Number) ?? [],
    ),
  );
  const [selectedPizzaTypes, { toggle: togglePizzaTypes }] =
    useSet(
      new Set<PizzaType>(
        (searchParams
          .get('types')
          ?.split(',') as PizzaType[]) ?? [],
      ),
    );
  const [selectedPizzaSizes, { toggle: toggleSizes }] =
    useSet(
      new Set<number>(
        searchParams.get('sizes')?.split(',').map(Number) ??
          [],
      ),
    );

  return {
    selectedIngredients,
    selectedPizzaTypes,
    selectedPizzaSizes,
    prices,
    toggleIngredients,
    togglePizzaTypes,
    toggleSizes,
    setPrices,
  };
};
