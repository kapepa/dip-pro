import { FC } from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form/form-input";
import { FormPhone } from "../form/form-phone";

interface CheckoutPersonalFormProps {
  className?: string
}

const CheckoutPersonalForm: FC<CheckoutPersonalFormProps> = (props) => {
  const { className } = props;

  return (
    <WhiteBlock
      title="2. Personal data"
      className={className}
    >
      <div
        className="grid grid-cols-2 gap-5"
      >
        <FormInput
          name="fullName"
          type="text"
          className="text-base"
          placeholder="Ім'я"
        />
        <FormInput
          name="email"
          type="email"
          className="text-base"
          placeholder="E-mail"
        />
        <FormPhone
          name="phone"
          type="text"
          className="text-base"
          placeholder="Телефон"
        />
      </div>
    </WhiteBlock>
  )
}

export { CheckoutPersonalForm }