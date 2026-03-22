import React from 'react';
import {
  ExtrasGrid,
  IngredientsList,
  PizzaVariants,
  Title,
  PizzaImage,
} from '@/components/shared';
import { ProductWithDetails } from './products-group-list';
import { Button } from '@/components/ui';
import { usePizzaOptions } from '@/hooks';
import { getPizzaDetails } from '@/lib';

interface Props {
  product: ProductWithDetails;
  onSubmit: VoidFunction;
  loading: boolean;
}

export const PizzaForm: React.FC<Props> = (props) => {
  const { product, onSubmit, loading } = props;

  const {
    type,
    size,
    selectedItem,
    optionalIngredients,
    extraIngredients,
    availableSizes,
    availableTypes,
    setSize,
    toggleOptional,
    toggleExtra,
    onTypeChange,
  } = usePizzaOptions(product.items);

  const { textDetails, totalPrice } = getPizzaDetails(
    selectedItem,
    product.productIngredients,
    extraIngredients,
  );

  const handleClickAdd = () => {
    onSubmit?.();
  };

  return (
    <div className="grid max-h-[670px] w-full flex-1 grid-cols-[1.3fr_1fr] items-center">
      <PizzaImage
        className="px-6"
        imageUrl={selectedItem!.imageUrl}
        alt={product.name}
        size={size as 20 | 30 | 40}
      />

      <div className="flex flex-col gap-3 rounded-md bg-[#fcfcfc]">
        <div className="scrollbar flex h-[560px] flex-col overflow-auto px-7 pt-5">
          <Title
            className="mb-1 font-extrabold"
            text={product.name}
            size="md"
          />

          <p className="text-sm text-gray-400">
            {textDetails}
          </p>

          <IngredientsList
            ingredients={product.productIngredients}
            optionalSet={optionalIngredients}
            toggleOptional={toggleOptional}
          />

          <PizzaVariants
            sizes={availableSizes}
            typeOptions={availableTypes}
            size={size}
            type={type}
            setSize={setSize}
            setType={onTypeChange}
          />

          <ExtrasGrid
            ingredients={product.productIngredients}
            extraSet={extraIngredients}
            toggleExtra={toggleExtra}
          />
        </div>
        <div className="px-7 pt-5 pb-7">
          <Button
            loading={loading}
            className="h-11 w-full text-base"
            onClick={handleClickAdd}
          >
            Добавить в корзину за {totalPrice} ₽
          </Button>
        </div>
      </div>
    </div>
  );
};
