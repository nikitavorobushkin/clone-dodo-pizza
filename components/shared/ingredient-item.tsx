import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import React from 'react';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'relative flex cursor-pointer flex-col items-center rounded-md border border-transparent bg-white p-1 text-center shadow-md',
        { 'border-primary': active },
        className,
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck
          className="text-primary absolute top-2 right-2"
          size={24}
          strokeWidth={2}
        />
      )}
      <img
        src={imageUrl}
        width={110}
        height={110}
        alt={name}
      />
      <span className="mb-1 text-xs">{name}</span>
      <span className="mt-auto font-bold">{price} ₽</span>
    </div>
  );
};
