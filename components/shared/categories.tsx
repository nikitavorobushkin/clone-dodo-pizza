'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { slugify } from 'transliteration';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';
import { useWhyDidYouUpdate } from 'ahooks';

export type CategoryItem = Category & {
  disabled: boolean;
};

interface Props {
  items: CategoryItem[];
  className?: string;
}

export const Categories: React.FC<Props> = (props) => {
  const { items, className } = props;

  const activeId = useCategoryStore(
    (state) => state.activeId,
  );

  // Хук для отслеживания ререндеров
  useWhyDidYouUpdate('Categories', {
    items,
    activeId,
  });

  return (
    <div
      className={cn(
        'inline-flex gap-1 rounded-xl bg-gray-50 p-1',
        className,
      )}
    >
      {items.map(({ name, id, disabled }) => (
        <a
          className={cn(
            'flex h-11 items-center rounded-lg px-5 text-base font-semibold',
            activeId === id &&
              'text-primary bg-white shadow-md shadow-gray-200',
            disabled &&
              'cursor-not-allowed text-gray-500 opacity-50',
          )}
          href={disabled ? undefined : `#${slugify(name)}`}
          key={id}
        >
          {name}
        </a>
      ))}
    </div>
  );
};
