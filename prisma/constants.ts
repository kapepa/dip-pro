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
    name: 'Pizzas',
  },
  {
    name: 'Breakfast',
  },
  {
    name: 'Snacks',
  },
  {
    name: 'Cocktails',
  },
  {
    name: 'Drinks',
  },
];


export const _ingredients: Prisma.IngredientCreateInput[] = [
  {
    name: 'Cheesy crust',
    price: 179,
    imageUrl: '/ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Creamy mozzarella',
    price: 79,
    imageUrl: '/ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Cheddar and parmesan cheeses',
    price: 79,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA69C1FE796.png',
  },
  {
    name: 'Spicy jalapeño pepper',
    price: 59,
    imageUrl: '/ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Tender chicken',
    price: 79,
    imageUrl: '/ingredients/000D3A39D824A82E11E9AFA5B328D35A.png',
  },
  {
    name: 'Mushrooms',
    price: 59,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA67259A324.png',
  },
  {
    name: 'Ham',
    price: 79,
    imageUrl: '/ingredients/000D3A39D824A82E11E9AFA61B9A8D61.png',
  },
  {
    name: 'Spicy pepperoni',
    price: 79,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA6258199C3.png',
  },
  {
    name: 'Spicy chorizo',
    price: 79,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA62D5D6027.png',
  },
  {
    name: 'Pickled cucumbers',
    price: 59,
    imageUrl: '/ingredients/000D3A21DA51A81211E9EA89958D782B.png',
  },
  {
    name: 'Fresh tomatoes',
    price: 59,
    imageUrl: '/ingredients/000D3A39D824A82E11E9AFA7AC1A1D67.png',
  },
  {
    name: 'Red onion',
    price: 59,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA60AE6464C.png',
  },
  {
    name: 'Juicy pineapples',
    price: 59,
    imageUrl: '/ingredients/000D3A21DA51A81211E9AFA6795BA2A0.png',
  },
  {
    name: 'Italian herbs',
    price: 39,
    imageUrl: '/ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Bell pepper',
    price: 59,
    imageUrl: '/ingredients/000D3A22FA54A81411E9AFA63F774C1B.png',
  },
  {
    name: 'Feta cheese cubes',
    price: 79,
    imageUrl: '/ingredients/000D3A39D824A82E11E9AFA6B0FFC349.png',
  },
  {
    name: 'Meatballs',
    price: 79,
    imageUrl: '/ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
];

export const _products: Prisma.ProductCreateInput[] = [
  {
    name: 'Omelette with ham and mushrooms',
    imageUrl: '/products/11EE7970321044479C1D1085457A36EB.webp',
  },
  {
    name: 'Omelette with pepperoni',
    imageUrl: '/products/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
  },
  {
    name: 'Coffee Latte',
    imageUrl: '/products/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
  },
  {
    name: 'Denwich ham and cheese',
    imageUrl: '/products/11EE796FF0059B799A17F57A9E64C725.webp',
  },
  {
    name: 'Chicken nuggets',
    imageUrl: '/products/11EE7D618B5C7EC29350069AE9532C6E.webp',
  },
  {
    name: 'Oven-baked potatoes with sauce 🌱',
    imageUrl: '/products/11EED646A9CD324C962C6BEA78124F19.webp',
  },
  {
    name: 'Dodster',
    imageUrl: '/products/11EE796F96D11392A2F6DD73599921B9.webp',
  },
  {
    name: 'Spicy Dodster 🌶️🌶️',
    imageUrl: '/products/11EE796FD3B594068F7A752DF8161D04.webp',
  },
  {
    name: 'Banana milkshake',
    imageUrl: '/products/11EEE20B8772A72A9B60CFB20012C185.webp',
  },
  {
    name: 'Caramel apple milkshake',
    imageUrl: '/products/11EE79702E2A22E693D96133906FB1B8.webp',
  },
  {
    name: 'Oreo cookie milkshake',
    imageUrl: '/products/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
  },
  {
    name: 'Classic milkshake 👶',
    imageUrl: '/products/11EE796F93FB126693F96CB1D3E403FB.webp',
  },
  {
    name: 'Irish Cappuccino',
    imageUrl: '/products/11EE7D61999EBDA59C10E216430A6093.webp',
  },
  {
    name: 'Caramel cappuccino coffee',
    imageUrl: '/products/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
  },
  {
    name: 'Coconut latte coffee',
    imageUrl: '/products/11EE7D61B19FA07090EE88B0ED347F42.webp',
  },
  {
    name: 'Americano coffee',
    imageUrl: '/products/11EE7D61B044583596548A59078BBD33.webp',
  },
  {
    name: 'Coffee Latte',
    imageUrl: '/products/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
  },
];