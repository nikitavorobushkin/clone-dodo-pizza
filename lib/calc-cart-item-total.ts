import { CartWithDetails } from '@/services/cart';

export const calcCartItemTotal = (
  item: CartWithDetails['items'][number],
) => {
  const ingredientsTotalPrice = item.cartItemIngredients
    .filter((ingredient) => ingredient.added)
    .reduce((sum, item) => sum + item.ingredient.price, 0);
  return (
    item.quantity *
    (ingredientsTotalPrice + item.productItem.price)
  );
};
