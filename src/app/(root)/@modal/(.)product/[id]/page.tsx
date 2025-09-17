import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal";
import prisma from "@/lib/prisma";
import { NextPage } from "next";
import { notFound } from "next/navigation";

interface ProductIdModalPage {
  params: Promise<{ id: string }>
}

const ProductIdModalPage: NextPage<ProductIdModalPage> = async (props) => {
  const { id } = await props.params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      ingredients: true,
      productItem: true,
    }
  });

  if (!product) return notFound();

  return (
    <ChooseProductModal
      product={product}
    />
  )
}

export default ProductIdModalPage;