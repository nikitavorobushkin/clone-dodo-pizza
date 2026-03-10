'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { ProductForm } from '@/components/shared';
import { ProductWithDetails } from '@/components/shared/products-group-list';
import { useRouter } from 'next/navigation';

interface Props {
  product: ProductWithDetails;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = (
  props,
) => {
  const { className, product } = props;

  const router = useRouter();

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={() => router.back()}
    >
      <DialogContent
        className={cn(
          'min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0',
          className,
        )}
      >
        <DialogTitle className="sr-only">
          Choose product
        </DialogTitle>

        <ProductForm
          product={product}
          onSubmit={() => router.back()}
        />
      </DialogContent>
    </Dialog>
  );
};
