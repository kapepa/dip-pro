'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../../ui/textarea';
import { ClearButton } from '../clear-button';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorText } from '../error-text';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
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
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />

        {fieldValue && <ClearButton onClick={handleClear} />}
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