import {
  Container,
  TopBar,
  Filters,
  ProductsGroupList,
} from '@/components/shared';
import { findPizzas } from '@/lib';
import { GetSearchParams } from '@/lib/find-pizza';

export const metadata = {
  title: 'Главная',
};

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

  const filteredCategories = categories.filter(
    (category) => category.products.length > 0,
  );

  return (
    <>
      <TopBar
        categories={categories.map((category) => ({
          ...category,
          disabled: category.products.length === 0,
        }))}
      />

      <Container className="my-10">
        <div className="flex gap-16">
          <Filters className="w-60 flex-none" />
          <div className="flex flex-col gap-10">
            {filteredCategories.map((category) => (
              <ProductsGroupList
                key={category.id}
                title={category.name}
                items={category.products}
                categoryId={category.id}
              />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
