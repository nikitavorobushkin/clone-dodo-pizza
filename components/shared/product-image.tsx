import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  imageUrl: string;
  alt: string;
  className?: string;
}

export const ProductImage: React.FC<Props> = (props) => {
  const { imageUrl, alt, className } = props;
  return (
    <div
      className={cn(
        'relative flex aspect-square w-full flex-1 items-center justify-center',
        className,
      )}
    >
      <img
        className={cn(
          'relative top-2 left-2 z-10 size-[430px] transition-all duration-300',
        )}
        src={imageUrl}
        alt={alt}
      />
    </div>
  );
};

export default ProductImage;
