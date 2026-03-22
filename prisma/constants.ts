export const categories = [
  {
    name: 'Пиццы',
  },
  {
    name: 'Завтраки',
  },
  {
    name: 'Закуски',
  },
  {
    name: 'Коктейли',
  },
  {
    name: 'Напитки',
  },
];

export const ingredients = [
  {
    name: 'Сырный бортик',
    price: 179,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Сливочная моцарелла',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
  },
  {
    name: 'Острый перец халапеньо',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Нежный цыпленок',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
  },
  {
    name: 'Пикантная пепперони',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
  },
  {
    name: 'Острая чоризо',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
  },
  {
    name: 'Маринованные огурчики',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
  },
  {
    name: 'Сочные ананасы',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
  },
  {
    name: 'Итальянские травы',
    price: 39,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
  },
  {
    name: 'Кубики брынзы',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
  },
  {
    name: 'Митболы',
    price: 79,
    imageUrl:
      'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: 'Омлет с ветчиной и грибами',
    description:
      'Вкусный омлет с ветчиной и свежими грибами.',
    categoryId: 2,
  },
  {
    name: 'Омлет с пепперони',
    description:
      'Омлет с ароматной пепперони и нежным сыром.',
    categoryId: 2,
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    description:
      'Как вкуснее есть печенье? Его лучше пить! Попробуйте молочный коктейль с мороженым и дробленым печеньем «Орео»',
    categoryId: 2,
  },
  {
    name: 'Дэнвич ветчина и сыр',
    description:
      'Свежий сэндвич с ветчиной, сыром и хрустящим хлебом.',
    categoryId: 3,
  },
  {
    name: 'Куриные наггетсы',
    description:
      'Сочные наггетсы из куриного филе, идеально для перекуса.',
    categoryId: 3,
  },
  {
    name: 'Картофель из печи с соусом 🌱',
    description: 'Запечённый картофель с фирменным соусом.',
    categoryId: 3,
  },
  {
    name: 'Додстер',
    description:
      'Традиционный Додстер с начинкой по вашему вкусу.',
    categoryId: 3,
  },
  {
    name: 'Острый Додстер 🌶️🌶️',
    description:
      'Острый Додстер с пикантной начинкой для любителей острого.',
    categoryId: 3,
  },
  {
    name: 'Персиковый молочный коктейль',
    description: 'Нежный молочный коктейль с бананом.',
    categoryId: 4,
  },
  {
    name: 'Карамельное яблоко молочный коктейль',
    description:
      'Сладкий коктейль с карамельным яблоком и молоком.',
    categoryId: 4,
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    description:
      'Кремовый коктейль с кусочками печенья Орео.',
    categoryId: 4,
  },
  {
    name: 'Персиковый молочный коктейль 👶',
    description:
      'Нежный коктейль с вкусом спелого персика.',
    categoryId: 4,
  },
  {
    name: 'Ирландский Капучино',
    description:
      'Ароматный капучино с ноткой ирландского вкуса.',
    categoryId: 5,
  },
  {
    name: 'Кофе Карамельный капучино',
    description:
      'Капучино с насыщенным карамельным вкусом.',
    categoryId: 5,
  },
  {
    name: 'Кофе Кокосовый латте',
    description: 'Латте с нежным кокосовым ароматом.',
    categoryId: 5,
  },
  {
    name: 'Кофе Американо',
    description:
      'Классический американо с насыщенным вкусом кофе.',
    categoryId: 5,
  },
  {
    name: 'Кофе Латте',
    description:
      'Классический латте с нежной молочной пенкой.',
    categoryId: 5,
  },
];
