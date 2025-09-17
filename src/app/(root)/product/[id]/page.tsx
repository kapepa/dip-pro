import { ChooseBase } from "@/components/shared/choose-base";
import { Container } from "@/components/shared/container";
import prisma from "@/lib/prisma";
import { NextPage } from "next";
import { notFound } from "next/navigation";

interface ProductIdProps {
  params: Promise<{ id: string }>
}

const ProductId: NextPage<ProductIdProps> = async (props) => {
  const { id } = await props.params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      ingredients: true,
      productItem: true,
      category: {
        include: {
          products: {
            include: {
              productItem: true,
            }
          }
        }
      },
    }
  });

  if (!product) return notFound();

  return (
    <Container
      className="flex flex-col my-10"
    >
      <ChooseBase
        product={product}
      />
    </Container>
  )
}

export default ProductId;