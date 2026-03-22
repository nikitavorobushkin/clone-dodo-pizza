import { create } from 'zustand/index';
import { Api } from '@/services/api-client';
import {
  CartItemDTO,
  mapCartToStore,
} from '@/lib/map-cart-to-store';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartItemDTO[];

  /* Получение товаров из корзины */
  getCartItems: () => Promise<void>;

  /* Запрос на обновление количества товара */
  updateItemQuantity: (
    id: number,
    quantity: number,
  ) => Promise<void>;

  /* Запрос на добавление товара в корзину */
  addCartItem: (values: any) => Promise<void>;

  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>(
  (set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    getCartItems: async () => {
      try {
        set({
          loading: true,
          error: false,
        });
        const data = await Api.cart.getCart();
        set(mapCartToStore(data));
      } catch (error) {
        console.error(error);
      }
    },

    removeCartItem: async (id: number) => {},
    updateItemQuantity: async (
      id: number,
      quantity: number,
    ) => {},
    addCartItem: async (values: any) => {},
  }),
);
