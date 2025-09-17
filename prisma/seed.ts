import { Prisma, PrismaClient } from "@prisma/client";
import { _ingredients, _users, _categories, _products } from "./constants";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = _users;
const categoriesData: Prisma.CategoryCreateInput[] = _categories;
const productsData: Prisma.ProductCreateInput[] = _products;
const ingredientsData: Prisma.IngredientCreateInput[] = _ingredients;

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: string;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput;
};

export async function main() {
  try {
    await clearSeed()
    await createSeed()
  } catch (err) {
    console.log(err)
  }
}

async function clearSeed() {
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.productItem.deleteMany({})
  await prisma.category.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.ingredient.deleteMany({});
}

async function createSeed() {
  const addId = (items: Prisma.ProductCreateInput[], id: string) => {
    return items.map(item => ({ ...item, categoryId: id }))
  }

  const ingredients = await Promise.all(ingredientsData.map(ingredient => prisma.ingredient.create({ data: ingredient })))

  const [userOne, userTwo] = await Promise.all(userData.map(user => prisma.user.create({ data: user })))
  const [Pizzas, Breakfast, Snacks, Cocktails, Drinks] = await Promise.all(categoriesData.map((category) => prisma.category.create({ data: category })));
  const [pizza1, pizza2, pizza3] = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Cheese Pizza',
        imageUrl: '/pizzas/11EE7D61304FAF5A98A6958F2BB2D260.webp',
        categoryId: Pizzas.id,
        ingredients: {
          connect: ingredients.slice(0, 5).map(ingredient => ({ id: ingredient.id })),
        }
      },
    }),
    prisma.product.create({
      data: {
        name: 'Street Pizza',
        imageUrl: '/pizzas/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
        categoryId: Pizzas.id,
        ingredients: {
          connect: ingredients.slice(5, 10).map(ingredient => ({
            id: ingredient.id
          })),
        },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Chorizo Fresh',
        imageUrl: '/pizzas/11EE7D61706D472F9A5D71EB94149304.webp',
        categoryId: Pizzas.id, // Use the actual category object's ID instead of hardcoded 1
        ingredients: {
          connect: ingredients.slice(10, 15).map(ingredient => ({
            id: ingredient.id
          })),
        },
      },
    })
  ]);
  const product = await Promise.all(
    [
      ...addId(productsData.slice(0, 4), Breakfast.id),
      ...addId(productsData.slice(4, 8), Snacks.id),
      ...addId(productsData.slice(8, 13), Cocktails.id),
      ...addId(productsData.slice(13), Drinks.id),
    ]
      .map((product: Prisma.ProductCreateInput) => prisma.product.create({ data: product }))
  )

  const [productItem] = await Promise.all([
    generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
    generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
    generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

    generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
    generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
    generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
    generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
    generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
    generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

    generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
    generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
    generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

    generateProductItem({ productId: product[0].id }),
    generateProductItem({ productId: product[1].id }),
    generateProductItem({ productId: product[2].id }),
    generateProductItem({ productId: product[3].id }),
    generateProductItem({ productId: product[4].id }),
    generateProductItem({ productId: product[5].id }),
    generateProductItem({ productId: product[6].id }),
    generateProductItem({ productId: product[7].id }),
    generateProductItem({ productId: product[8].id }),
    generateProductItem({ productId: product[9].id }),
    generateProductItem({ productId: product[10].id }),
    generateProductItem({ productId: product[11].id }),
    generateProductItem({ productId: product[12].id }),
    generateProductItem({ productId: product[13].id }),
    generateProductItem({ productId: product[14].id }),
    generateProductItem({ productId: product[15].id }),
    generateProductItem({ productId: product[16].id }),
  ].map(productItem => prisma.productItem.create({ data: productItem })))

  const [cartOne] = await Promise.all([
    {
      userId: userOne.id,
      totalAmount: 600,
      token: '11111',
    },
    {
      userId: userTwo.id,
      totalAmount: 0,
      token: '222222',
    },
  ].map(cart => prisma.cart.create({ data: cart })));


  await prisma.cartItem.create({
    data: {
      productItemId: productItem.id,
      cartId: cartOne.id,
      quantity: 2,
      ingredients: {
        connect: [{ id: ingredients[0].id }, { id: ingredients[1].id }, { id: ingredients[2].id }],
      },
    },
  });
}

main();