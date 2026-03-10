import React from 'react';
import { cn } from '@/lib/utils';

import {
  Categories,
  SortPopup,
  Container,
} from '@/components/shared';
import { Category } from '@prisma/client';

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = (props) => {
  const { categories, className } = props;

  return (
    <nav
      className={cn(
        'sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5',
        className,
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </nav>
  );
};
