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
      title="3. Delivery address"
      className={className}
    >
      <div
        className="flex flex-col gap-5"
      >
        <FromStreet
          name="address"
          type="text"
          className="text-base"
          placeholder="Address"
        />
        <FormTextarea
          rows={5}
          name="comment"
          className="text-base"
          placeholder="Comments on orders"
        />
      </div>
    </WhiteBlock>
  )
}

export { CheckoutAddressForm }