import { PizzaType } from '@prisma/client';

export function formatPizzaType(type: PizzaType) {
  const types = {
    THIN: 'Тонкое',
    TRADITIONAL: 'Традиционное',
  };

  return `${types[type]}`;
}
