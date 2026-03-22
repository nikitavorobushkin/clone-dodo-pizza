import React from 'react';
import { Title } from '@/components/shared';
import { Button } from '@/components/ui';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  addedIngredients?: string;
  removedIngredients?: string;
  disabled: boolean;
  onClickCountButton: () => void;
  onClickRemove: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = (props) => {
  const {
    imageUrl,
    name,
    price,
    quantity,
    details,
    addedIngredients,
    removedIngredients,
    disabled,
    onClickCountButton,
    onClickRemove,
    className,
  } = props;

  return (
    <article
      className={cn(
        'relative flex flex-col gap-3 bg-white px-4 py-3',
        {
          'pointer-events-none opacity-50': disabled,
        },
        className,
      )}
    >
      <Button
        className="group absolute top-1 right-1"
        variant="link"
        size="icon"
        onClick={onClickRemove}
      >
        <Trash2
          className="transition-all duration-300 group-hover:stroke-3"
          size={16}
          strokeWidth={2.5}
        />
      </Button>
      <div className="flex items-center gap-4">
        <img
          className="size-[65px] flex-none object-cover object-center"
          src={imageUrl}
          width={65}
          height={65}
          alt=""
        />

        <div className="flex w-full flex-col gap-0.5">
          <Title
            className="font-semibold"
            text={name}
            size="xs"
          />
          <div className="text-xs text-gray-500">
            <p>{details}</p>
            {addedIngredients && (
              <p>+ {addedIngredients}</p>
            )}
            {removedIngredients && (
              <p>- {removedIngredients}</p>
            )}
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-200" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-1 text-base">
          <Button
            className="group text-black"
            size="icon"
            variant="link"
            onClick={onClickCountButton}
          >
            <Minus
              className="transition-all duration-300 group-hover:stroke-3"
              size={15}
              strokeWidth={2.5}
            />
          </Button>
          <span className="text-[15px] leading-none font-semibold">
            {quantity}
          </span>
          <Button
            className="group text-black"
            size="icon"
            variant="link"
            onClick={onClickCountButton}
          >
            <Plus
              className="transition-all duration-300 group-hover:stroke-3"
              size={15}
              strokeWidth={2.5}
            />
          </Button>
        </div>

        <div className="leading-none font-semibold">
          {price} ₽
        </div>
      </div>
    </article>
  );
};
