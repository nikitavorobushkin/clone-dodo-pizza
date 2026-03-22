import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Container,
  SearchInput,
  CartButton,
} from '@/components/shared';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link className="flex items-center gap-4" href="/">
          <Image
            className="object-contain object-center"
            src="/logo.png"
            alt="Next Pizza logo"
            width={35}
            height={35}
          />

          <div className="flex flex-col gap-0.5">
            <span className="text-2xl leading-none font-bold">
              Next Pizza
            </span>
            <span className="text-sm leading-none text-gray-500">
              Самая вкусная пицца
            </span>
          </div>
        </Link>

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="flex items-center gap-2 leading-none"
            variant="outline"
          >
            <User size={15} strokeWidth={2.5} />
            <span>Войти</span>
          </Button>

          <CartButton />
        </div>
      </Container>
    </header>
  );
};
