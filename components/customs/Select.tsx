import React, { FC } from "react";
import { Controller } from "react-hook-form";

interface SelectProps {
  name: string;
  control: any;
  error: any;
  className?: string;
  rules?: any;
  showError?: boolean;
  data: { value: string | number; text: string }[];
}

const Select: FC<SelectProps> = ({
  control,
  error,
  name,
  className = "mt-4 w-full rounded-sm border px-4 py-3 text-[15px] outline-none focus:border-black lg:text-[16px]",
  rules,
  showError = true,
  data,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <select defaultValue={''}  {...field} className={className}>
              <option selected={false}  value={""}>Vui lòng chọn</option>  
            {data?.map((item) => (
              <option key={item.value} value={item.value}>{item.text}</option>
            ))}
          </select>
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

export default Select;
