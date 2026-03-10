import React from 'react';
import { cn } from '@/lib/utils';
import {
  PizzaCircleLarge,
  PizzaCircleSmall,
} from '@/components/shared';

interface Props {
  imageUrl: string;
  size: 20 | 30 | 40;
  alt: string;
  className?: string;
}

export const PizzaImage: React.FC<Props> = (props) => {
  const { imageUrl, size, alt, className } = props;
  return (
    <div
      className={cn(
        'relative flex aspect-square w-full flex-1 items-center justify-center',
        className,
      )}
    >
      <img
        className={cn(
          'relative top-2 left-2 z-10 transition-all duration-300',
          {
            'size-[300px]': size === 20,
            'size-[400px]': size === 30,
            'size-[500px]': size === 40,
          },
        )}
        src={imageUrl}
        alt={alt}
      />

      <div className="absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-gray-100" />
      <div className="absolute top-1/2 left-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dotted border-gray-100" />

      <PizzaCircleLarge className="absolute top-1/2 left-1/2 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2" />
      <PizzaCircleSmall className="absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default PizzaImage;
