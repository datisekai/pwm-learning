import React from "react";

interface BoxSearchProps {
  title: string;
  data: { value: string; text: string }[];
  name: string;
}

const BoxSearch: React.FC<BoxSearchProps> = ({ data, title, name }) => {
  return (
    <div className="border-b-2 pb-2 md:last:border-none">
      <h2 className="font-bold uppercase">{title}</h2>
      <div className="mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              className="w-4 h-4 text-primary"
              id={`${item.value}-${index}`}
            />
            <label htmlFor={`${item.value}-${index}`} className="ml-2">
              {item.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxSearch;
