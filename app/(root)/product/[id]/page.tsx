import React from 'react';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

import {
  Container,
  ProductFormContainer,
  ProductsGroupList,
} from '@/components/shared';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({
  params,
}: Props) {
  const { id } = await params;

  // TODO: Сделать получение рекомендаций отдельным запросом для оптимизации
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      category: {
        include: {
          products: {
            include: {
              items: true,
              productIngredients: {
                include: {
                  ingredient: true,
                },
              },
            },
          },
        },
      },
      productIngredients: {
        include: {
          ingredient: true,
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="my-10 flex flex-col">
      <ProductFormContainer product={product} />
      <ProductsGroupList
        className="mt-20"
        key={product.category.id}
        title="Рекомендации"
        items={product.category.products.filter(
          (item) => item.id !== product.id,
        )}
        categoryId={product.category.id}
        listClassName="grid-cols-4 gap-6"
      />
    </Container>
  );
}
