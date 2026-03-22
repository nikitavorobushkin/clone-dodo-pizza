import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

import {
  categories,
  ingredients,
  products,
} from './constants';
import {
  IngredientRole,
  PizzaType,
  ProductUnit,
} from '@prisma/client';
import { createProductIngredients } from './create-product-ingredients';
import { createProductItems } from './create-product-items';

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User',
        email: 'user@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin',
        email: 'admin@test.ru',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      categoryId: 1,
      productIngredients: {
        create: [
          ...createProductIngredients(
            ingredients
              .slice(0, 3)
              .map((pizza) => pizza.id),
            IngredientRole.BASE,
          ),
          ...createProductIngredients(
            ingredients
              .slice(3, 5)
              .map((pizza) => pizza.id),
            IngredientRole.OPTIONAL,
          ),
          ...createProductIngredients(
            ingredients
              .slice(5, 8)
              .map((pizza) => pizza.id),
            IngredientRole.EXTRA,
          ),
        ],
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      categoryId: 1,
      productIngredients: {
        create: [
          ...createProductIngredients(
            ingredients
              .slice(5, 10)
              .map((pizza) => pizza.id),
            IngredientRole.BASE,
          ),
          ...createProductIngredients(
            ingredients
              .slice(10, 12)
              .map((pizza) => pizza.id),
            IngredientRole.OPTIONAL,
          ),
          ...createProductIngredients(
            ingredients
              .slice(12, 16)
              .map((pizza) => pizza.id),
            IngredientRole.EXTRA,
          ),
        ],
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      categoryId: 1,
      productIngredients: {
        create: [
          ...createProductIngredients(
            ingredients
              .slice(10, 13)
              .map((pizza) => pizza.id),
            IngredientRole.BASE,
          ),
          ...createProductIngredients(
            ingredients
              .slice(13, 17)
              .map((pizza) => pizza.id),
            IngredientRole.OPTIONAL,
          ),
          ...createProductIngredients(
            ingredients
              .slice(0, 10)
              .map((pizza) => pizza.id),
            IngredientRole.EXTRA,
          ),
        ],
      },
    },
  });

  const thinPizza1Items = createProductItems(pizza1.id, {
    pizzaType: PizzaType.THIN,
    unit: ProductUnit.CM,
    values: [20, 30, 40],
    priceRange: [190, 600],
    images: [
      'https://media.dodostatic.net/image/r:1875x1875/0199f218497b75e9af21dba387e3b14b.avif',
      'https://media.dodostatic.net/image/r:1875x1875/0198bf572a8f77118a19836d5f75e235.avif',
      'https://media.dodostatic.net/image/r:1875x1875/0198bf574bf879bdb7fbad84b39cd3e2.avif',
    ],
    weights: [360, 470, 550],
    availability: [true, true, true],
  });

  const traditionalPizza1Items = createProductItems(
    pizza1.id,
    {
      pizzaType: PizzaType.TRADITIONAL,
      unit: ProductUnit.CM,
      values: [20, 30, 40],
      priceRange: [190, 600],
      images: [
        'https://media.dodostatic.net/image/r:1875x1875/0199f218497b75e9af21dba387e3b14b.avif',
        'https://media.dodostatic.net/image/r:1875x1875/0198bf572a8f77118a19836d5f75e235.avif',
        'https://media.dodostatic.net/image/r:1875x1875/0198bf574bf879bdb7fbad84b39cd3e2.avif',
      ],
      weights: [360, 470, 550],
      availability: [false, false, true],
    },
  );

  const thinPizza2Items = createProductItems(pizza2.id, {
    pizzaType: PizzaType.THIN,
    unit: ProductUnit.CM,
    values: [20, 30, 40],
    priceRange: [190, 500],
    images: [
      'https://media.dodostatic.net/image/r:1875x1875/019a8aad8a2c77ad8b37be4d895f3d6d.avif',
      'https://media.dodostatic.net/image/r:1875x1875/0198bf40f3da72bd8d205ff00cc3613e.avif',
      'https://media.dodostatic.net/image/r:1875x1875/0198bf410ffa72d9b35802f9f0c97c43.avif',
    ],
    weights: [360, 470, 550],
    availability: [true, true, true],
  });

  const traditionalPizza2Items = createProductItems(
    pizza2.id,
    {
      pizzaType: PizzaType.TRADITIONAL,
      unit: ProductUnit.CM,
      values: [20, 30, 40],
      priceRange: [290, 600],
      images: [
        'https://media.dodostatic.net/image/r:1875x1875/0198bf40dc1574eca41f1be918150dff.avif',
        'https://media.dodostatic.net/image/r:1875x1875/0198bf40e2987242886716627224c196.avif',
        'https://media.dodostatic.net/image/r:1875x1875/0198bf4107ab727ca78f5f0a80f9966f.avif',
      ],
      weights: [390, 490, 570],
      availability: [true, true, true],
    },
  );

  const thinPizza3Items = createProductItems(pizza3.id, {
    pizzaType: PizzaType.THIN,
    unit: ProductUnit.CM,
    values: [20, 30, 40],
    priceRange: [190, 600],
    images: [
      'https://media.dodostatic.net/image/r:1875x1875/0198bf438dac76cf9f87eaf3e2031882.avif',
      'https://media.dodostatic.net/image/r:1875x1875/0198bf438dac76cf9f87eaf3e2031882.avif',
      'https://media.dodostatic.net/image/r:1875x1875/0198bf43c52970879c7600791e4cab9f.avif',
    ],
    weights: [390, 490, 570],
    availability: [false, true, true],
  });

  const traditionalPizza3Items = createProductItems(
    pizza3.id,
    {
      pizzaType: PizzaType.TRADITIONAL,
      unit: ProductUnit.CM,
      values: [20, 30, 40],
      priceRange: [190, 600],
      images: [
        'https://media.dodostatic.net/image/r:1875x1875/0198bf438dac76cf9f87eaf3e2031882.avif',
        'https://media.dodostatic.net/image/r:1875x1875/0198bf438dac76cf9f87eaf3e2031882.avif',
        'https://media.dodostatic.net/image/r:1875x1875/0198bf438dac76cf9f87eaf3e2031882.avif',
      ],
      weights: [390, 490, 570],
      availability: [true, true, false],
    },
  );

  const product1 = createProductItems(1, {
    unit: ProductUnit.PCS,
    values: [1],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp',
    ],
    weights: [390],
    availability: [true],
  });

  const product2 = createProductItems(2, {
    unit: ProductUnit.PCS,
    values: [1],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
    ],
    weights: [390],
    availability: [true],
  });

  const product3 = createProductItems(3, {
    unit: ProductUnit.ML,
    values: [400, 500],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:1875x1875/019986494294739e9e1edf44accf8dcc.avif',
      'https://media.dodostatic.net/image/r:1875x1875/0199864950b471fdbd119c1a400e2809.avif',
    ],
    weights: [240, 360],
    availability: [true, true],
  });

  const product4 = createProductItems(4, {
    unit: ProductUnit.PCS,
    values: [1],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp',
    ],
    weights: [360],
    availability: [true],
  });

  const product5 = createProductItems(5, {
    unit: ProductUnit.PCS,
    values: [5, 10],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:1875x1875/0198131dce8b706bb3ed5a169df1bc84.avif',
      'https://media.dodostatic.net/image/r:1875x1875/0198131dd4ad799f8a87e1d3f7e8302e.avif',
    ],
    weights: [360, 540],
    availability: [true, true],
  });

  const product6 = createProductItems(6, {
    unit: ProductUnit.G,
    values: [80, 160],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:1875x1875/019bd3d8e05c7916b49a779e4d430294.avif',
      'https://media.dodostatic.net/image/r:1875x1875/019bd3d8eab67106a56ca4f5ac9647a6.avif',
    ],
    weights: [80, 160],
    availability: [true, true],
  });

  const product7 = createProductItems(7, {
    unit: ProductUnit.PCS,
    values: [1],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp',
    ],
    weights: [360],
    availability: [true],
  });

  const product8 = createProductItems(8, {
    unit: ProductUnit.PCS,
    values: [1],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp',
    ],
    weights: [360],
    availability: [true],
  });

  const product9 = createProductItems(9, {
    unit: ProductUnit.ML,
    values: [300, 600],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:1875x1875/0199864e07967186b27287dc88685579.avif',
      'https://media.dodostatic.net/image/r:1875x1875/0199864e144778c3a7332fdeaa32838a.avif',
    ],
    weights: [360, 420],
    availability: [true, true],
  });

  const product10 = createProductItems(10, {
    unit: ProductUnit.ML,
    values: [300, 400],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:1875x1875/0198227af30a72b3b2614e9da1d277a3.avif',
      'https://media.dodostatic.net/image/r:1875x1875/0198080d4afc7630942ccf26ed1c509e.avif',
    ],
    weights: [360, 420],
    availability: [true, true],
  });

  const product11 = createProductItems(11, {
    unit: ProductUnit.ML,
    values: [300, 400],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
      'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
    ],
    weights: [360, 420],
    availability: [true, false],
  });

  const product12 = createProductItems(12, {
    unit: ProductUnit.ML,
    values: [300, 400],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
      'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
    ],
    weights: [360, 420],
    availability: [true, false],
  });

  const product13 = createProductItems(13, {
    unit: ProductUnit.ML,
    values: [300, 400],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
      'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
    ],
    weights: [360, 420],
    availability: [true, false],
  });

  const product14 = createProductItems(14, {
    unit: ProductUnit.ML,
    values: [300, 400],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
      'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
    ],
    weights: [360, 420],
    availability: [true, false],
  });

  const product15 = createProductItems(15, {
    unit: ProductUnit.ML,
    values: [300, 400],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
    ],
    weights: [360, 420],
    availability: [true, false],
  });

  const product16 = createProductItems(16, {
    unit: ProductUnit.ML,
    values: [300, 400],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
    ],
    weights: [360, 420],
    availability: [true, false],
  });

  const product17 = createProductItems(17, {
    unit: ProductUnit.ML,
    values: [300, 400],
    priceRange: [200, 400],
    images: [
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
      'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
    ],
    weights: [360, 420],
    availability: [true, false],
  });

  await prisma.productItem.createMany({
    data: [
      ...thinPizza1Items,
      ...traditionalPizza1Items,

      // Пицца "Вторая"
      ...thinPizza2Items,
      ...traditionalPizza2Items,

      // Пицца "Чоризо фреш"
      ...thinPizza3Items,
      ...traditionalPizza3Items,

      // Остальные продукты
      ...product1,
      ...product2,
      ...product3,
      ...product4,
      ...product5,
      ...product6,
      ...product7,
      ...product8,
      ...product9,
      ...product10,
      ...product11,
      ...product12,
      ...product13,
      ...product14,
      ...product15,
      ...product16,
      ...product17,
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '111111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '222222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      cartItemIngredients: {
        create: [
          {
            ingredientId: 7,
            role: 'OPTIONAL',
            added: false, // убран из пиццы
          },
          {
            ingredientId: 2,
            role: 'OPTIONAL',
            added: false, // убран из пиццы
          },
          {
            ingredientId: 4,
            role: 'EXTRA',
            added: true,
          },
          {
            ingredientId: 5,
            role: 'EXTRA',
            added: true,
          },
        ],
      },
    },
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 7,
      cartId: 1,
      quantity: 1,
      cartItemIngredients: {
        create: [
          {
            ingredientId: 10,
            role: 'OPTIONAL',
            added: false, // убран из пиццы
          },
          {
            ingredientId: 11,
            role: 'OPTIONAL',
            added: false, // убран из пиццы
          },
          {
            ingredientId: 14,
            role: 'EXTRA',
            added: true,
          },
          {
            ingredientId: 13,
            role: 'EXTRA',
            added: true,
          },
        ],
      },
    },
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 34,
      cartId: 1,
      quantity: 1,
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductIngredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItemIngredient" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main().then(async () => {
  await prisma.$disconnect();
});
