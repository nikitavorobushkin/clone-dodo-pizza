import {
  Container,
  TopBar,
  Filters,
  ProductsGroupList,
} from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export const metadata = {
  title: 'Главная',
};

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  });

  return (
    <>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0,
        )}
      />

      <Container className="mt-10">
        <div className="flex gap-16">
          <Filters className="w-60 flex-none" />
          <div className="flex flex-col gap-10">
            {categories.map((category) => (
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
