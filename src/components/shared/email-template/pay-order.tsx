import { FC } from "react";

interface PayOrderProps {
  id: string,
  totalAmount: number,
}

const PayOrder: FC<PayOrderProps> = (props) => {
  const { id, totalAmount } = props;

  return (
    <div>
      <h1>Замовлення № {id}</h1>
      <p>Оплата на суму <b>{totalAmount} грн</b></p>
    </div>
  )
}

export { PayOrder }