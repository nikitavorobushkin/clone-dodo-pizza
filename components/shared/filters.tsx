'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  Title,
  RangeSlider,
  CheckboxFiltersGroup,
} from '@/components/shared';
import { Input } from '@/components/ui';
import {
  useFilters,
  useIngredients,
  useQueryFilters,
} from '@/hooks';
import { formatPizzaType } from '@/lib/format-pizza-type';
import { PizzaType } from '@prisma/client';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = (props) => {
  const { className } = props;
  const filters = useFilters();
  useQueryFilters(filters);

  const { ingredients, loading } = useIngredients();
  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id,
  }));

  const handlePriceFromChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    filters.setPrices((prev) => ({
      ...prev,
      priceFrom: Number(e.target.value),
    }));
  };

  const handlePriceToChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    filters.setPrices((prev) => ({
      ...prev,
      priceTo: Number(e.target.value),
    }));
  };

  const handleRangeChange = ([priceFrom, priceTo]: [
    number,
    number,
  ]) => {
    filters.setPrices({ priceFrom, priceTo });
  };

  return (
    <aside className={cn('flex flex-col', className)}>
      <Title
        text="Фильтрация"
        size="sm"
        className="font-bold"
      />

      <CheckboxFiltersGroup
        className="mt-5"
        title="Тип теста:"
        name="types"
        items={[
          {
            text: formatPizzaType(PizzaType.THIN),
            value: PizzaType.THIN,
          },
          {
            text: formatPizzaType(PizzaType.TRADITIONAL),
            value: PizzaType.TRADITIONAL,
          },
        ]}
        selected={filters.selectedPizzaTypes}
        onClickCheckbox={filters.togglePizzaTypes}
      />

      <CheckboxFiltersGroup
        className="mt-5"
        title="Размеры:"
        name="sizes"
        items={[
          {
            text: '20 см',
            value: 20,
          },
          {
            text: '30 см',
            value: 30,
          },
          {
            text: '40 см',
            value: 40,
          },
        ]}
        selected={filters.selectedPizzaSizes}
        onClickCheckbox={filters.toggleSizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <Title
          text="Цена от и до:"
          size="xs"
          className="mb-3.5 font-bold"
        />
        <div className="mb-5 flex gap-3.5">
          <div className="relative flex w-full items-center">
            <Input
              type="number"
              min={0}
              max={1000}
              value={String(filters.prices.priceFrom)}
              placeholder="0"
              inputMode="numeric"
              onChange={handlePriceFromChange}
            />
            <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
              ₽
            </span>
          </div>
          <div className="relative flex w-full items-center">
            <Input
              type="number"
              min={0}
              max={1000}
              value={String(filters.prices.priceTo)}
              placeholder="1000"
              inputMode="numeric"
              onChange={handlePriceToChange}
            />
            <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
              ₽
            </span>
          </div>
        </div>
        <RangeSlider
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          min={0}
          max={1000}
          step={10}
          onValueChange={handleRangeChange}
        />
      </div>

      <CheckboxFiltersGroup
        className="mt-5"
        title="Ингредиенты:"
        name="ingredients"
        limit={6}
        items={items}
        loading={loading}
        selected={filters.selectedIngredients}
        onClickCheckbox={filters.toggleIngredients}
      />
    </aside>
  );
};
