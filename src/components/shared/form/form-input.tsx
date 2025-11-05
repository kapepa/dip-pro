"use client"

import { FC, InputHTMLAttributes } from "react";
import { RequiredSymbol } from "../required-symbol";
import { Input } from "@/components/ui/input";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
  label?: string,
  className?: string,
}

const FormInput: FC<FormInputProps> = (props) => {
  const { name, label, required, className, ...otherProps } = props;
  const {
    register,
    formState: { errors },
    setValue,
    watch
  } = useFormContext();

  const fieldValue = watch(name);

  const handleClear = () => {
    setValue(name, "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className={className}>
      {label && (
        <p className={`
          font-medium mb-2
          text-sm xs:text-base
        `}>
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input
          className={`
            h-10 xs:h-11 sm:h-12
            text-sm xs:text-base
          `}
          {...register(name)}
          {...otherProps}
        />
        {fieldValue && (
          <ClearButton
            onClick={handleClear}
            className={`
              w-4 h-4 xs:w-5 xs:h-5
              right-2 xs:right-3
            `}
          />
        )}
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <ErrorText
            text={message}
            className={`
              mt-1 xs:mt-2
              text-xs xs:text-sm
            `}
          />
        )}
      />
    </div>
  );
};
export { FormInput };