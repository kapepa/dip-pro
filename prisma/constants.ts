import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";

export const _users: Prisma.UserCreateInput[] = [
  {
    fullName: "Alice",
    email: "alice@prisma.io",
    password: hashSync("123456", 12),
    verified: true,
    role: "USER"
  },
  {
    fullName: "Bob",
    email: "bob@prisma.io",
    password: hashSync("123456", 12),
    verified: true,
    role: "ADMIN"
  }]

export const _categories: Prisma.CategoryCreateInput[] = [
  {
    name: 'Піци',
  },
  {
    name: 'Сніданки',
  },
  {
    name: 'Закуски',
  },
  {
    name: 'Коктейлі',
  },
  {
    name: 'Напої',
  },
];


export const _ingredients: Prisma.IngredientCreateInput[] = [
  {
    name: 'Сирний край',
    price: 179,
    imageUrl: '/ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Ніжна моцарелла',
    price: 79,
    imageUrl: '/ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Сир чеддер та пармезан',
    price: 79,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA69C1FE796.png',
  },
  {
    name: 'Гострий перець халапеньйо',
    price: 59,
    imageUrl: '/ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Ніжна курка',
    price: 79,
    imageUrl: '/ingredients/000D3A39D824A82E11E9AFA5B328D35A.png',
  },
  {
    name: 'Гриби',
    price: 59,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA67259A324.png',
  },
  {
    name: 'Шинка',
    price: 79,
    imageUrl: '/ingredients/000D3A39D824A82E11E9AFA61B9A8D61.png',
  },
  {
    name: 'Гостра пепероні',
    price: 79,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA6258199C3.png',
  },
  {
    name: 'Гостра чорізо',
    price: 79,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA62D5D6027.png',
  },
  {
    name: 'Мариновані огірки',
    price: 59,
    imageUrl: '/ingredients/000D3A21DA51A81211E9EA89958D782B.png',
  },
  {
    name: 'Свіжі томати',
    price: 59,
    imageUrl: '/ingredients/000D3A39D824A82E11E9AFA7AC1A1D67.png',
  },
  {
    name: 'Червона цибуля',
    price: 59,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA60AE6464C.png',
  },
  {
    name: 'Соковиті ананаси',
    price: 59,
    imageUrl: '/ingredients/000D3A21DA51A81211E9AFA6795BA2A0.png',
  },
  {
    name: 'Італійські трави',
    price: 39,
    imageUrl: '/ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Солодкий перець',
    price: 59,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA63F774C1B.png',
  },
  {
    name: 'Кубики сиру фета',
    price: 79,
    imageUrl: '/ingredients/000D3A39D824A82E11E9AFA6B0FFC349.png',
  },
  {
    name: 'М\'ясні кульки',
    price: 79,
    imageUrl: '/ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
];

export const _products: Prisma.ProductCreateInput[] = [
  {
    name: 'Омлет з шинкою та грибами',
    imageUrl: '/products/11EE7970321044479C1D1085457A36EB.webp',
  },
  {
    name: 'Омлет з пепероні',
    imageUrl: '/products/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
  },
  {
    name: 'Кава Латте',
    imageUrl: '/products/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
  },
  {
    name: 'Денвіч з шинкою та сиром',
    imageUrl: '/products/11EE796FF0059B799A17F57A9E64C725.webp',
  },
  {
    name: 'Курячі нагетси',
    imageUrl: '/products/11EE7D618B5C7EC29350069AE9532C6E.webp',
  },
  {
    name: 'Картопля запечена з соусом 🌱',
    imageUrl: '/products/11EED646A9CD324C962C6BEA78124F19.webp',
  },
  {
    name: 'Додстер',
    imageUrl: '/products/11EE796F96D11392A2F6DD73599921B9.webp',
  },
  {
    name: 'Гострий Додстер 🌶️🌶️',
    imageUrl: '/products/11EE796FD3B594068F7A752DF8161D04.webp',
  },
  {
    name: 'Молочний коктейль з бананом',
    imageUrl: '/products/11EEE20B8772A72A9B60CFB20012C185.webp',
  },
  {
    name: 'Молочний коктейль з яблуком та карамеллю',
    imageUrl: '/products/11EE79702E2A22E693D96133906FB1B8.webp',
  },
  {
    name: 'Молочний коктейль з печивом Oreo',
    imageUrl: '/products/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
  },
  {
    name: 'Класичний молочний коктейль 👶',
    imageUrl: '/products/11EE796F93FB126693F96CB1D3E403FB.webp',
  },
  {
    name: 'Ірландський Капучіно',
    imageUrl: '/products/11EE7D61999EBDA59C10E216430A6093.webp',
  },
  {
    name: 'Кава капучіно з карамеллю',
    imageUrl: '/products/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
  },
  {
    name: 'Кава кокосове латте',
    imageUrl: '/products/11EE7D61B19FA07090EE88B0ED347F42.webp',
  },
  {
    name: 'Кава Американо',
    imageUrl: '/products/11EE7D61B044583596548A59078BBD33.webp',
  },
  {
    name: 'Кава Латте',
    imageUrl: '/products/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
  },
];