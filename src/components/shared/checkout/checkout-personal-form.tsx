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
      title="2. Персональні дані"
      className={className}
    >
      <div
        className="
          grid
          grid-cols-1
          gap-4

          sm:gap-5
          md:grid-cols-2
          md:gap-6
        "
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
          className="text-base md:col-span-2"
          placeholder="Телефон"
        />
      </div>
    </WhiteBlock>
  )
}

export { CheckoutPersonalForm }