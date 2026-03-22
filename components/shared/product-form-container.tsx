'use client';

import React from 'react';
import {
  PizzaForm,
  ProductForm,
} from '@/components/shared';
import { ProductWithDetails } from '@/components/shared/products-group-list';

interface Props {
  product: ProductWithDetails;
  onSubmit?: VoidFunction;
}

export const ProductFormContainer: React.FC<Props> = (
  props,
) => {
  const { product, onSubmit: _onSubmit } = props;

  const isPizza = product.items[0].pizzaType;

  const onSubmit = () => {
    _onSubmit?.();
  };

  if (isPizza) {
    return (
      <PizzaForm
        product={product}
        loading={false}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <ProductForm
      product={product}
      loading={false}
      onSubmit={onSubmit}
    />
  );
};
