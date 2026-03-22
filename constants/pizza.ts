import { PizzaType } from '@prisma/client';

export type PizzaSizeValue = 20 | 30 | 40;

export const mapPizzaSize = {
  20: '20 см',
  30: '30 см',
  40: '40 см',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(
  ([value, name]) => ({
    name,
    value: Number(value) as PizzaSizeValue,
  }),
);

export const mapPizzaType = {
  [PizzaType.TRADITIONAL]: 'Традиционное',
  [PizzaType.THIN]: 'Тонкое',
} as const;

export const pizzaTypes = Object.entries(mapPizzaType).map(
  ([value, name]) => ({
    name,
    value: value as PizzaType,
  }),
);

export type PizzaTypeValue = PizzaType;
