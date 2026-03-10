import { Filters } from '@/hooks/use-filters';
import { useDebounce } from 'react-use';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useDebounce(
    () => {
      const params = {
        ...filters.prices,
        types: [...filters.selectedPizzaTypes],
        sizes: [...filters.selectedPizzaSizes],
        ingredients: [...filters.selectedIngredients],
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      router.replace(`/?${query}`, {
        scroll: false,
      });
    },
    1000,
    [
      filters.prices.priceFrom,
      filters.prices.priceTo,
      Array.from(filters.selectedPizzaTypes).join(','),
      Array.from(filters.selectedPizzaSizes).join(','),
      Array.from(filters.selectedIngredients).join(','),
      router,
    ],
  );
};
