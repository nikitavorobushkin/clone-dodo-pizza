'use client';

import React from 'react';
import { IngredientRole } from '@prisma/client';
import { CircleX, Undo2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductWithDetails } from '@/components/shared/products-group-list';

interface Props {
  ingredients: ProductWithDetails['productIngredients'];
  optionalSet: Set<number>;
  toggleOptional: (id: number) => void;
}

export const IngredientsList: React.FC<Props> = ({
  ingredients,
  optionalSet,
  toggleOptional,
}) => {
  const ingredientsWithoutExtra = ingredients.filter(
    ({ role }) => role !== IngredientRole.EXTRA,
  );

  return (
    <div className="mt-3 flex flex-wrap gap-1.5 text-sm">
      {ingredientsWithoutExtra.map(
        ({ ingredient, role }, index, arr) => {
          const isOptional =
            role === IngredientRole.OPTIONAL;

          const displayName =
            index === 0
              ? ingredient.name[0].toUpperCase() +
                ingredient.name.slice(1)
              : ingredient.name.toLowerCase();

          const element = isOptional ? (
            <button
              key={ingredient.id}
              className={cn(
                'group inline-flex cursor-pointer items-center',
                {
                  'underline decoration-dotted underline-offset-4':
                    !optionalSet.has(ingredient.id),
                  'line-through': optionalSet.has(
                    ingredient.id,
                  ),
                },
              )}
              onClick={() => toggleOptional(ingredient.id)}
            >
              {displayName}&nbsp;
              {!optionalSet.has(ingredient.id) ? (
                <CircleX
                  className="text-gray-400 group-hover:text-gray-900"
                  size={16}
                  strokeWidth={2}
                />
              ) : (
                <Undo2
                  className="text-gray-400 group-hover:text-gray-900"
                  size={16}
                  strokeWidth={2}
                />
              )}
            </button>
          ) : (
            <span key={ingredient.id}>{displayName}</span>
          );

          return (
            <span key={ingredient.id}>
              {element}
              {index < arr.length - 1 ? ', ' : '.'}
            </span>
          );
        },
      )}
    </div>
  );
};
