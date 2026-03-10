import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Title } from '@/components/shared';
import { Button } from '@/components/ui';
import { PlusIcon } from 'lucide-react';

interface Props {
  id: number;
  title: string;
  ingredients: string[];
  price: number;
  imageUrl: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = (props) => {
  const {
    className,
    title,
    ingredients,
    price,
    imageUrl,
    id,
  } = props;

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const description =
    ingredients
      .map((ingredient, index) =>
        index === 0 ? capitalize(ingredient) : ingredient,
      )
      .join(', ') ||
    'Горячий сытный омлет с поджаристой корочкой, ветчина, шампиньоны и моцарелла';

  return (
    <article className={cn('flex flex-col', className)}>
      <Link
        className="flex h-full flex-col"
        href={`/product/${id}`}
      >
        <div className="group bg-secondary mb-3.5 flex h-64 items-center justify-center rounded-lg">
          <img
            className="object-cover object-center transition duration-300 group-hover:translate-y-1/20"
            src={imageUrl}
            alt={title}
            width={212}
            height={212}
          />
        </div>

        <Title
          className="mb-2 font-bold"
          text={title}
          size="sm"
        />

        <div className="mb-3.5 text-sm text-gray-400">
          <p>{description}</p>
        </div>

        <footer className="mt-auto flex items-center justify-between">
          <span>
            от <b>{price} ₽</b>
          </span>

          <Button variant="secondary" asChild>
            <div className="flex items-center gap-1.5 font-semibold">
              <PlusIcon size={16} strokeWidth={2} />
              <span>Добавить</span>
            </div>
          </Button>
        </footer>
      </Link>
    </article>
  );
};
