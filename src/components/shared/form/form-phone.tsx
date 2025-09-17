import { FC, InputHTMLAttributes, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { RequiredSymbol } from "../required-symbol";
import { ClearButton } from "../clear-button";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "../error-text";
import { IMaskMixin } from 'react-imask';

const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <Input ref={ref} {...props} />
  )
);
CustomInput.displayName = "CustomInput";

const MaskedInput = IMaskMixin<HTMLInputElement>(({ inputRef, ...props }) => (
  <CustomInput ref={inputRef} {...props} />
));

interface FormPhoneProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
}

const FormPhone: FC<FormPhoneProps> = (props) => {
  const { name, label, required, className, ...otherProps } = props;
  const {
    formState: { errors },
    setValue,
    watch,
    trigger
  } = useFormContext();

  const fieldValue = watch(name);

  const handleClear = () => {
    setValue(name, "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  const handleAccept = (value: string) => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    trigger(name);
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <MaskedInput
          className="h-12 text-base"
          mask="+{38} (000) 000-00-00"
          definitions={{
            '#': /[1-9]/
          }}
          unmask={true}
          onAccept={handleAccept}
          placeholder="+38 (0__) ___-__-__"
          {...otherProps}
        />
        {fieldValue && (
          <ClearButton onClick={handleClear} />
        )}
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <ErrorText
            text={message}
            className="mt-2"
          />
        )}
      />
    </div>
  );
}

export { FormPhone };