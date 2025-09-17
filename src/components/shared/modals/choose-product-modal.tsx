"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { ProductType } from "../types/product-type";
import { ChooseBase } from "../choose-base";

interface ChooseProductModalProps {
  product: ProductType,
}

const ChooseProductModal: FC<ChooseProductModalProps> = (props) => {
  const { product } = props;
  const router = useRouter();

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={() => router.back()}
    >
      <DialogTitle />
      <DialogContent
        className='p-0 min-h-[500px] bg-white overflow-hidden'
        style={{
          width: '1060px',
          maxWidth: '1060px',
        }}
      >
        <ChooseBase
          product={product}
        />
      </DialogContent>
    </Dialog>
  )
}

export { ChooseProductModal }