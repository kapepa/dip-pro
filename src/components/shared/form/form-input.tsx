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
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input
          className="h-12 text-base"
          {...register(name)}
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
};
export { FormInput };