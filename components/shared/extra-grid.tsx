import React from 'react';
import { IngredientItem as UIIngredientItem } from './ingredient-item';
import { IngredientRole, Prisma } from '@prisma/client';
import { ProductWithDetails } from '@/components/shared/products-group-list';
import { Title } from '@/components/shared/title';

interface Props {
  ingredients: ProductWithDetails['productIngredients'];
  extraSet: Set<number>;
  toggleExtra: (id: number) => void;
}

export const ExtrasGrid: React.FC<Props> = ({
  ingredients,
  extraSet,
  toggleExtra,
}) => {
  const extraIngredients = ingredients.filter(
    ({ role }) => role === IngredientRole.EXTRA,
  );

  return (
    <>
      <Title
        className="mt-5 mb-1 font-extrabold"
        text={'Добавить по вкусу'}
        size="md"
      />
      <div className="mb-5 rounded-md py-2">
        <div className="grid grid-cols-3 gap-3">
          {extraIngredients.map(({ ingredient }) => (
            <UIIngredientItem
              key={ingredient.id}
              name={ingredient.name}
              price={ingredient.price}
              imageUrl={ingredient.imageUrl}
              onClick={() => toggleExtra(ingredient.id)}
              active={extraSet.has(ingredient.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
