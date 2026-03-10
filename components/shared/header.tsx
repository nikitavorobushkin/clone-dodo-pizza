import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Container,
  SearchInput,
} from '@/components/shared';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ShoppingCart,
  User,
} from 'lucide-react';

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
            <User size={14} strokeWidth={2} />
            <span>Войти</span>
          </Button>
          <Button className="group relative flex items-center gap-3.5 leading-none">
            <b>520 ₽</b>
            <span className="h-full w-[1px] bg-white/30" />
            <div className="flex items-center gap-2 transition duration-300 group-hover:opacity-0">
              <ShoppingCart size={16} strokeWidth={2} />
              <b>3</b>
            </div>
            <ArrowRight
              className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              size={16}
              strokeWidth={2}
            />
          </Button>
        </div>
      </Container>
    </header>
  );
};
