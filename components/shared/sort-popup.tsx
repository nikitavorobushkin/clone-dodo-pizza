import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = (props) => {
  const { className } = props;

  return (
    <div
      className={cn(
        'inline-flex h-[52px] cursor-pointer items-center gap-2 rounded-2xl bg-gray-50 px-5',
        className,
      )}
    >
      <ArrowUpDown size={16} strokeWidth={2} />
      <div className="flex gap-1">
        <b>Сортировка по:</b>
        <b className="text-primary">рейтингу</b>
      </div>
    </div>
  );
};
