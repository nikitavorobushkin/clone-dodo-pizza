import { formatSize } from '@/lib/format-size';
import { formatPizzaType } from '@/lib/format-pizza-type';
import { PizzaType, ProductItem } from '@prisma/client';
import { ProductWithDetails } from '@/components/shared/products-group-list';

interface ReturnProps {
  textDetails: string;
  totalPrice: number;
}

export const getPizzaDetails = (
  selectedItem: ProductItem,
  ingredients: ProductWithDetails['productIngredients'],
  extraIngredients: Set<number>,
): ReturnProps => {
  const textDetails = ` ${formatSize(
    selectedItem.value,
    selectedItem.unit,
  )}, ${formatPizzaType(
    selectedItem.pizzaType as PizzaType,
  ).toLowerCase()} тесто, ${selectedItem.weight} г`;

  const totalPrice =
    selectedItem.price +
    ingredients
      .filter((item) =>
        extraIngredients.has(item.ingredientId),
      )
      .reduce(
        (sum, value) => sum + value.ingredient.price,
        0,
      );

  return {
    textDetails,
    totalPrice,
  };
};
