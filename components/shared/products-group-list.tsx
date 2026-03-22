'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Title, ProductCard } from '@/components/shared';
import { useIntersection } from 'react-use';
import { slugify } from 'transliteration';
import { useCategoryStore } from '@/store/category';
import { IngredientRole, Prisma } from '@prisma/client';
import { capitalize } from '@/helpers/capitalize';

export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    items: true;
    productIngredients: {
      include: {
        ingredient: true;
      };
    };
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
          const previewImageUrl =
            product.items.find((i) => i.value === 40)
              ?.imageUrl || product.items[0].imageUrl;

          const ingredients = product.productIngredients
            .filter(
              (item) =>
                item.role === IngredientRole.BASE ||
                item.role === IngredientRole.OPTIONAL,
            )
            .map((item) =>
              item.ingredient.name.toLowerCase(),
            );

          const description = ingredients.length
            ? `${capitalize(ingredients.join(', '))}.`
            : product.description || '';

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              description={description}
              price={product.items[0].price}
              imageUrl={previewImageUrl}
            />
          );
        })}
      </div>
    </section>
  );
};
