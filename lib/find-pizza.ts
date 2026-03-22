import { prisma } from '@/prisma/prisma-client';
import { PizzaType } from '@prisma/client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  types?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (
  params: GetSearchParams,
) => {
  const queryParams = await params;

  const sizes = queryParams.sizes?.split(',').map(Number);
  const pizzaTypes = queryParams.types?.split(
    ',',
  ) as PizzaType[];

  const ingredientsIdArr = queryParams.ingredients
    ?.split(',')
    .map(Number);

  const minPrice = Number(
    queryParams.priceFrom ?? DEFAULT_MIN_PRICE,
  );
  const maxPrice = Number(
    queryParams.priceTo ?? DEFAULT_MAX_PRICE,
  );

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          productIngredients: ingredientsIdArr
            ? {
                some: {
                  ingredientId: {
                    in: ingredientsIdArr,
                  },
                },
              }
            : undefined,
          items: {
            some: {
              value: {
                in: sizes,
              },
              pizzaType: {
                in: pizzaTypes,
              },
              isAvailable: true,
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
        include: {
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
              isAvailable: true,
            },
            orderBy: {
              price: 'asc',
            },
          },
          productIngredients: {
            include: {
              ingredient: true,
            },
          },
        },
      },
    },
  });

  return categories;
};
