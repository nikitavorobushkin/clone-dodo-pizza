'use client';

import React from 'react';
import {
  FilterCheckbox,
  FilterCheckboxProps,
} from './filter-checkbox';

import { Title } from '@/components/shared/title';
import { Input, Skeleton } from '@/components/ui';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  className?: string;
  items: Item[];
  limit?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: number) => void;
  defaultValue?: string[];
  selected?: Set<number>;
  name: string;
  loading?: boolean;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
  props,
) => {
  const {
    title,
    className,
    items,
    limit = 5,
    searchInputPlaceholder = 'Поиск...',
    onClickCheckbox,
    selected,
    name,
    loading,
  } = props;

  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  if (loading) {
    return (
      <div className={className}>
        <Title
          text={title}
          size="xs"
          className="mb-3.5 font-bold"
        />

        <div className="flex flex-col gap-4 pr-2">
          {Array.from({ length: limit }).map((_, index) => (
            <Skeleton
              className="h-6 rounded-[8px]"
              key={index}
            />
          ))}
        </div>
        <Skeleton className="mt-5 h-6 w-28 rounded-[8px]" />
      </div>
    );
  }

  const resolvedItems = showAll
    ? items.filter((item) =>
        item.text
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      )
    : items?.slice(0, limit);

  const onChangeSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={className}>
      <Title
        text={title}
        size="xs"
        className="mb-3.5 font-bold"
      />

      {showAll && (
        <div className="mb-5">
          <Input
            className="border-none bg-gray-50"
            type="search"
            value={searchValue}
            placeholder={searchInputPlaceholder}
            onChange={onChangeSearchInput}
          />
        </div>
      )}

      <div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
        {resolvedItems.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            name={name}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() =>
              onClickCheckbox?.(item.value)
            }
          />
        ))}
      </div>

      {items.length > limit && (
        <div
          className={
            showAll
              ? 'border-b border-neutral-100 pb-4'
              : ''
          }
        >
          <button
            className="text-primary mt-5 flex cursor-pointer items-center gap-1"
            type="button"
            onClick={() =>
              setShowAll((prevState) => !prevState)
            }
          >
            {showAll ? 'Скрыть' : '+ Показать всё'}
          </button>
        </div>
      )}
    </div>
  );
};
