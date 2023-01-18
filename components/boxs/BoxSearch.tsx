import { useRouter } from "next/router";
import React from "react";

interface BoxSearchProps {
  title: string;
  data: { value: string; text: string }[];
  name: string;
}

const BoxSearch: React.FC<BoxSearchProps> = ({ data, title, name }) => {
  const router = useRouter()
  return (
    <div className="border-b-2 pb-2 last:border-none">
      <h2 className="font-bold uppercase">{title}</h2>
      <div className="mt-4">
        {data.map((item, index) => (
          <>
          <div key={index} className="flex py-1 items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={item.value}
              onChange={(e) => {
                if(e.target.checked){
                  switch(e.target.value){
                    case "510":
                      router.push({query:{...router.query, min:5000000, max:10000000}})
                      break;
                    case "1050":
                      router.push({query:{...router.query, min:10000000, max:50000000}})
                      break;
                    case "50100":
                      router.push({query:{...router.query, min:50000000, max:100000000}})
                      break;
                    case "100":
                      router.push({query:{...router.query, min:100000000}})
                      break;
                    default:
                      break;
                  }
                }
              }}
              className="w-4 h-4 text-primary"
              id={`${item.value}-${index}`}
            />
            <label htmlFor={`${item.value}-${index}`} className="ml-2">
              {item.text}
            </label>
          </div>
          
          </>
        ))}
      </div>
    </div>
  );
};

export default BoxSearch;
