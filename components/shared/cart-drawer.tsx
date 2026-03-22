'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { CartDrawerItem, Title } from '@/components/shared';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import { formatSize } from '@/lib/format-size';
import { formatPizzaType } from '@/lib/format-pizza-type';

export const CartDrawer: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const totalAmount = useCartStore(
    (state) => state.totalAmount,
  );
  const items = useCartStore((state) => state.items);
  const getCartItems = useCartStore(
    (state) => state.getCartItems,
  );

  React.useEffect(() => {
    getCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between bg-[#F4F1EE] pb-0">
        <div
          className={cn(
            'flex h-full flex-col',
            'justify-center',
          )}
        >
          <SheetHeader>
            <SheetTitle
              className={cn('py-2 text-xl font-normal', {
                'sr-only': !items.length,
              })}
            >
              В корзине&nbsp;
              <span className="font-bold">
                {items.length} товара
              </span>
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 && (
            <div className="mx-auto my-auto flex w-72 flex-col items-center justify-center">
              <Image
                src="/assets/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Корзина пустая"
                className="my-2 text-center font-bold"
              />
              <p className="mb-5 text-center text-neutral-500">
                Добавьте хотя бы одну пиццу, чтобы совершить
                заказ
              </p>

              <SheetClose asChild>
                <Button
                  className="h-12 w-56 text-base"
                  size="lg"
                >
                  <ArrowLeft className="mr-2 w-5" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {items.length > 0 && (
            <>
              <div className="scrollbar overflow-auto">
                <div className="flex flex-1 flex-col gap-3 pb-5">
                  {items.map((item) => {
                    const pizzaTypeString = item.pizzaType
                      ? `, ${formatPizzaType(
                          item.pizzaType,
                        ).toLowerCase()}`
                      : '';

                    const valueString = formatSize(
                      item.value,
                      item.unit,
                    );

                    const details =
                      valueString + pizzaTypeString;

                    const addedIngredients =
                      item.ingredients
                        .filter((item) => item.added)
                        .map((item) =>
                          item.name.toLowerCase(),
                        )
                        .join(', ');

                    const removedIngredients =
                      item.ingredients
                        .filter((item) => !item.added)
                        .map((item) =>
                          item.name.toLowerCase(),
                        )
                        .join(', ');

                    return (
                      <CartDrawerItem
                        key={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        details={details}
                        disabled={false}
                        addedIngredients={addedIngredients}
                        removedIngredients={
                          removedIngredients
                        }
                        onClickCountButton={() => {}}
                        onClickRemove={() => {}}
                      />
                    );
                  })}
                </div>
              </div>

              <SheetFooter className="z-10 bg-white px-6 pt-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="w-full">
                  <div className="mb-4 flex">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Сумма заказа
                    </span>

                    <span className="text-lg font-bold">
                      {totalAmount} ₽
                    </span>
                  </div>

                  <Link href="/checkout">
                    <Button
                      onClick={() => {}}
                      loading={false}
                      type="submit"
                      className="w-full text-base"
                    >
                      Оформить заказ
                      <ArrowRight className="ml-2 w-5" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
