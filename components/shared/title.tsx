import clsx from 'clsx';
import React from 'react';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
  size?: TitleSize;
  className?: string;
  text: string;
  id?: string;
}

export const Title: React.FC<Props> = ({
  text,
  size = 'sm',
  className,
  id,
}) => {
  const mapTagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  } as const;

  const mapClassNameBySize = {
    xs: 'text-[16px] leading-tight',
    sm: 'text-[22px] leading-tight',
    md: 'text-[26px] leading-tight',
    lg: 'text-[36px] leading-tight',
    xl: 'text-[40px] leading-tight',
    '2xl': 'text-[48px] leading-tight',
  } as const;

  return React.createElement(
    mapTagBySize[size],
    {
      className: clsx(mapClassNameBySize[size], className),
      id: id,
    },
    text,
  );
};
