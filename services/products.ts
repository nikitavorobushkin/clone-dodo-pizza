import { Prisma } from '@prisma/client';
import { axiosInstance } from '@/services/axios';
import { ApiRoutes } from '@/services/constants';

export type ProductWithItems = Prisma.ProductGetPayload<{
  include: { items: true };
}>;

export const search = async (
  query: string,
): Promise<ProductWithItems[]> => {
  const { data } = await axiosInstance.get<
    ProductWithItems[]
  >(ApiRoutes.SEARCH_PRODUCTS, {
    params: { query },
  });

  return data;
};
