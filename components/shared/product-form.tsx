import React from 'react';
import {
  IngredientItem,
  Title,
  Variants,
} from '@/components/shared';
import { cn } from '@/lib/utils';
import { CircleX, Undo2 } from 'lucide-react';
import { ProductWithDetails } from './products-group-list';
import PizzaImage from '@/components/shared/pizza-image';
import {
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from '@/constants/pizza';
import { Button } from '@/components/ui';
import { useSet } from 'react-use';

interface Props {
  product: ProductWithDetails;
  onSubmit: VoidFunction;
}

export const ProductForm: React.FC<Props> = (props) => {
  const { product, onSubmit } = props;

  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const [
    selectedIngredients,
    { toggle: toggleIngredients },
  ] = useSet(new Set<number>([]));

  return (
    <div className="grid max-h-[670px] w-full flex-1 grid-cols-[1.3fr_1fr] items-center">
      <PizzaImage
        className="px-6"
        imageUrl={product.imageUrl}
        alt={product.name}
        size={20}
      />

      <div className="flex flex-col gap-3 bg-[#fcfcfc]">
        <div className="scrollbar flex h-[560px] flex-col overflow-auto px-7 pt-5">
          <Title
            className="mb-1 font-extrabold"
            text={product.name}
            size="md"
          />

          <p className="text-sm text-gray-400">
            25 см, традиционное тесто 25, 360 г
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.ingredients.map(
              (ingredient, index) => (
                <button
                  className={cn(
                    'group flex cursor-pointer items-center text-sm',
                    {
                      'underline decoration-dotted underline-offset-4':
                        index === 1,
                      'line-through': index === 2,
                    },
                  )}
                  key={ingredient.id}
                >
                  {ingredient.name}&nbsp;
                  {index === 1 && (
                    <CircleX
                      className="text-gray-400 transition-colors duration-300 ease-in-out group-hover:text-gray-900"
                      size={16}
                      strokeWidth={2}
                    />
                  )}
                  {index === 2 && (
                    <Undo2
                      className="text-gray-400 transition-colors duration-300 ease-in-out group-hover:text-gray-900"
                      size={16}
                      strokeWidth={2}
                    />
                  )}
                </button>
              ),
            )}
          </div>

          <div className="mt-5 flex flex-col gap-5">
            <Variants
              items={pizzaSizes}
              value={String(size)}
              onClick={(value) =>
                setSize(Number(value) as PizzaSize)
              }
            />

            <Variants
              items={pizzaTypes}
              value={String(type)}
              onClick={(value) =>
                setType(Number(value) as PizzaType)
              }
            />
          </div>

          <Title
            className="mt-5 mb-1 font-extrabold"
            text={'Добавить по вкусу'}
            size="md"
          />

          <div className="mb-5 rounded-md py-2">
            <div className="grid grid-cols-3 gap-3">
              {product.ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  name={ingredient.name}
                  price={ingredient.price}
                  imageUrl={ingredient.imageUrl}
                  onClick={() =>
                    toggleIngredients(ingredient.id)
                  }
                  active={selectedIngredients.has(
                    ingredient.id,
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="px-7 pt-5 pb-7">
          <Button
            className="h-11 w-full text-base"
            onClick={() => console.log('buy')}
          >
            Добавить в корзину за {product.items[0].price} ₽
          </Button>
        </div>
      </div>
    </div>
  );
};
