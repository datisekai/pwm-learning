import React, { FC } from "react";
import { Controller } from "react-hook-form";

interface TextFieldProps {
  name: string;
  type?: string;
  control: any;
  error: any;
  className?: string;
  placeholder?: string;
  rules?: any;
  showError?: boolean;
  errorTextColor?:string
}

const TextField: FC<TextFieldProps> = ({
  control,
  error,
  name,
  className = "mt-4 w-full rounded-sm border px-4 py-3 text-[15px] outline-none focus:border-black lg:text-[16px]",
  type = "text",
  placeholder = "",
  rules,
  showError = true,
  errorTextColor ='text-primary'
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            className={className}
            placeholder={placeholder}
          />
        )}
      />
      {showError && (
        <p className={`py-1 text-sm ${errorTextColor}`}>
          {error[name] && error[name].message}
        </p>
      )}
    </>
  );
};

export default TextField;