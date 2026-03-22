import { PizzaType, ProductUnit } from '@prisma/client';
import { randomDecimalNumber } from './random-decimal-number';

interface ProductItemData {
  pizzaType?: PizzaType; // тонкое/традиционное тесто
  unit: ProductUnit; // CM, ML, PCS
  values: number[]; // размеры или кол-во, например [20, 30, 40]
  weights: number[];
  availability: boolean[];
  priceRange: [number, number]; // диапазон цены
  images: string[]; // картинки для каждого размера
}

export function createProductItems(
  productId: number,
  data: ProductItemData,
) {
  const {
    pizzaType,
    unit,
    values,
    priceRange,
    images,
    weights,
    availability,
  } = data;

  return values.map((value, idx) => ({
    productId,
    pizzaType,
    value,
    unit,
    price: randomDecimalNumber(
      priceRange[0],
      priceRange[1],
    ),
    imageUrl: images[idx] || images[0],
    weight: weights[idx],
    isAvailable: availability[idx],
  }));
}
