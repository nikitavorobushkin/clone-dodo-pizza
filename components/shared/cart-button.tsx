'use client';

import React from 'react';
import { CartDrawer } from '@/components/shared';
import { Button } from '@/components/ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = (props) => {
  const { className } = props;

  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore(
    (state) => state.totalAmount,
  );

  return (
    <CartDrawer>
      <Button
        className={cn(
          'group relative flex items-center gap-3.5 leading-none',
          className,
        )}
      >
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30" />
        <div className="flex items-center gap-2 transition duration-300 group-hover:opacity-0">
          <ShoppingCart
            className="mb-0.5"
            size={15}
            strokeWidth={2.5}
          />
          <span className="leading-0 font-bold">
            {items.length}
          </span>
        </div>
        <ArrowRight
          className="absolute right-5 -translate-x-4 opacity-0 transition duration-300 group-hover:-translate-x-1 group-hover:opacity-100"
          size={16}
          strokeWidth={2.5}
        />
      </Button>
    </CartDrawer>
  );
};
