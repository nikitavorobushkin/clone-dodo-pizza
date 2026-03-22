import { Cart, Prisma } from '@prisma/client';
import { axiosInstance } from '@/services/axios';
import { ApiRoutes } from '@/services/constants';

export type CartWithDetails = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        productItem: {
          include: {
            product: true;
          };
        };
        cartItemIngredients: {
          include: {
            ingredient: true;
          };
        };
      };
    };
  };
}>;

export const getCart =
  async (): Promise<CartWithDetails> => {
    const { data } =
      await axiosInstance.get<CartWithDetails>(
        `${ApiRoutes.CART}`,
      );

    return data;
  };
