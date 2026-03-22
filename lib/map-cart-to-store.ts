import { PizzaType, ProductUnit } from '@prisma/client';
import { CartWithDetails } from '@/services/cart';
import { calcCartItemTotal } from '@/lib/calc-cart-item-total';

export interface CartItemDTO {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaType?: PizzaType;
  value: number;
  unit: ProductUnit;
  ingredients: Array<{
    name: string;
    price: number;
    added: boolean | null;
  }>;
}

interface ReturnProps {
  items: CartItemDTO[];
  totalAmount: number;
}

export const mapCartToStore = (
  data: CartWithDetails,
): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.imageUrl,
    pizzaType: item.productItem.pizzaType ?? undefined,
    value: item.productItem.value,
    unit: item.productItem.unit,
    price: calcCartItemTotal(item),
    ingredients: item.cartItemIngredients.map((item) => ({
      name: item.ingredient.name,
      price: item.ingredient.price,
      added: item.added,
    })),
  }));

  return {
    totalAmount: data.totalAmount,
    items: items,
  };
};
