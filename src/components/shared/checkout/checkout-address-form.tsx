import { FC } from "react";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form/form-textarea";
import { FromStreet } from "../form/from-street";

interface CheckoutAddressFormProps {
  className?: string
}

const CheckoutAddressForm: FC<CheckoutAddressFormProps> = (props) => {
  const { className } = props;

  return (
    <WhiteBlock
      title="3. Адреса доставки"
      className={className}
    >
      <div
        className="
          flex flex-col
          gap-4

          sm:gap-5
          md:gap-6
        "
      >
        <FromStreet
          name="address"
          type="text"
          className="text-base"
          placeholder="Адреса"
        />

        <FormTextarea
          rows={4}
          name="comment"
          className="text-base resize-none"
          placeholder="Коментарі до замовлень"
        />
      </div>
    </WhiteBlock>
  )
}

export { CheckoutAddressForm }