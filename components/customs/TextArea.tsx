import React, { FC } from "react";
import { Controller } from "react-hook-form";

interface TextAreaProps {
  name: string;
  control: any;
  error: any;
  className?: string;
  placeholder?: string;
  rules?: any;
  showError?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  control,
  error,
  name,
  className = "mt-4 w-full rounded-sm border px-4 py-3 text-[15px] outline-none focus:border-black lg:text-[16px]",
  placeholder = "",
  rules,
  showError = true,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <textarea
            {...field}
            className={className}
            placeholder={placeholder}
          />
        )}
      />
      {showError && (
        <p className="py-1 text-primary text-sm">
          {error[name] && error[name].message}
        </p>
      )}
    </>
  );
};

export default TextArea;