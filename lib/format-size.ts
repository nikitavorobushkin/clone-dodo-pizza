import { ProductUnit } from '@prisma/client';

export function formatSize(
  value: number,
  unit: ProductUnit,
) {
  const units = {
    CM: 'см',
    ML: 'мл',
    PCS: 'шт',
    G: 'г',
  };

  if (unit === 'ML') {
    return `${value / 1000} л`;
  }

  if (unit === 'G') {
    const sizes: Record<number, string> = {
      80: 'Стандартная',
      160: 'Большая',
    };

    return sizes[value] || `${value} г`;
  }

  return `${value} ${units[unit]}`;
}
