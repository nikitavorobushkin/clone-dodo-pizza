import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

import {
  Container,
  PizzaImage,
  Title,
} from '@/components/shared';
import { CircleX, Undo2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({
  params,
}: Props) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="my-10 flex flex-col">
      <div className="grid grid-cols-2 gap-12">
        <PizzaImage
          className=""
          imageUrl={product.imageUrl}
          alt={product.name}
          size={20}
        />

        <div className="bg-[#fcfcfc] p-7">
          <Title
            className="mb-1 font-extrabold"
            text={product.name}
            size="md"
          />
          <p className="text-sm text-gray-400">
            25 см, традиционное тесто 25, 360 г
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.ingredients.map(
              (ingredient, index) => (
                <button
                  className={cn(
                    'group flex cursor-pointer items-center text-sm',
                    {
                      'underline decoration-dotted underline-offset-4':
                        index === 1,
                      'line-through': index === 2,
                    },
                  )}
                  key={ingredient.id}
                >
                  {ingredient.name}&nbsp;
                  {index === 1 && (
                    <CircleX
                      className="text-gray-400 transition-colors duration-300 ease-in-out group-hover:text-gray-900"
                      size={16}
                      strokeWidth={2}
                    />
                  )}
                  {index === 2 && (
                    <Undo2
                      className="text-gray-400 transition-colors duration-300 ease-in-out group-hover:text-gray-900"
                      size={16}
                      strokeWidth={2}
                    />
                  )}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
