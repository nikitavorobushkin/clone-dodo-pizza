'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useClickAway, useDebounce } from 'react-use';
import { Search, XIcon } from 'lucide-react';

import { Api } from '@/services/api-client';
import { ProductWithItems } from '@/services/products';
import { Button, Input } from '@/components/ui';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = (props) => {
  const { className } = props;

  const [searchQuery, setSearchQuery] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<
    ProductWithItems[]
  >([]);
  const ref = React.useRef(null!);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response =
          await Api.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    },
    500,
    [searchQuery],
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed inset-0 z-30 bg-black/50" />
      )}
      <div
        className={cn(
          'relative z-30 flex h-10 flex-1 justify-between rounded-2xl',
          className,
        )}
        ref={ref}
      >
        <Search
          className="absolute top-1/2 left-4.5 translate-y-[-50%] text-gray-400"
          size={16}
          strokeWidth={2}
        />

        <Input
          className="h-full rounded-2xl border-none bg-gray-50 px-11 leading-none"
          type="search"
          value={searchQuery}
          placeholder="Найти пиццу..."
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
        />

        {searchQuery && (
          <Button
            className="absolute top-0 right-1 cursor-pointer text-gray-400 transition-colors duration-300 hover:text-black"
            type="button"
            variant="link"
            size="icon"
            title="Сбосить поиск"
            aria-label="Reset search"
            onClick={() => setSearchQuery('')}
          >
            <XIcon size={16} strokeWidth={2} />
          </Button>
        )}

        {products.length > 0 && (
          <div
            className={cn(
              'invisible absolute top-14 z-30 w-full rounded-xl bg-white py-2 opacity-0 shadow-md transition-all duration-200',
              focused && 'visible top-12 opacity-100',
            )}
          >
            {products.map((product) => (
              <Link
                className="hover:bg-primary/10 flex items-center gap-3.5 px-5 py-2.5"
                href={`/product/${product.id}`}
                key={product.id}
                onClick={onClickItem}
              >
                <img
                  className="rounded-sm object-cover object-center"
                  src={product.items[0].imageUrl}
                  width={32}
                  height={32}
                  alt={product.name}
                />
                <div className="">{product.name}</div>
                <div className="text-gray-400">
                  {product.items[0].price} ₽
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
