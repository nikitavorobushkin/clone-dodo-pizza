'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Title, ProductCard } from '@/components/shared';
import { useIntersection } from 'react-use';
import { slugify } from 'transliteration';
import { useCategoryStore } from '@/store/category';
import { Ingredient, Prisma } from '@prisma/client';

export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    items: true;
    ingredients: true;
  };
}>;

interface Props {
  title: string;
  items: ProductWithDetails[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = (
  props,
) => {
  const {
    title,
    items = [],
    categoryId,
    className,
    listClassName,
  } = props;

  const sectionId = slugify(title);
  const headingId = `${sectionId}-title`;

  const setActiveCategoryId = useCategoryStore(
    (state) => state.setActiveId,
  );

  const intersectionRef = React.useRef(null!);

  const intersection = useIntersection(intersectionRef, {
    rootMargin: '-40% 0px -60% 0px',
  });

  React.useEffect(() => {
    if (!intersection?.isIntersecting) return;
    setActiveCategoryId(categoryId);
  }, [
    categoryId,
    intersection?.isIntersecting,
    setActiveCategoryId,
  ]);

  return (
    <section
      className={cn('scroll-mt-32', className)}
      id={sectionId}
      aria-labelledby={headingId}
      ref={intersectionRef}
    >
      <Title
        className="mb-8 font-bold"
        text={title}
        size="lg"
        id={headingId}
      />
      <div
        className={cn(
          'grid grid-cols-3 gap-16',
          listClassName,
        )}
      >
        {items.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              ingredients={product.ingredients.map(
                (ingredient: Ingredient) => ingredient.name,
              )}
              price={product.items[0].price}
              imageUrl={product.imageUrl}
            />
          );
        })}
      </div>
    </section>
  );
};
