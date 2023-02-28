import { useRouter } from "next/router";
import React, { useState } from "react";
// import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

interface BoxSearchProps {
  title: string;
  data: { value: string; text: string }[];
  name: string;
}

const BoxSearch: React.FC<BoxSearchProps> = ({ data, title, name }) => {
  const router = useRouter();

  const [minValue, setMinValue] = useState(25);
	const [maxValue, setMaxValue] = useState(75);

  return (
    <div className="border-b-2 pb-2 md:last:border-none">
      <h2 className="font-bold uppercase">{title}</h2>
      <div className="mt-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex py-1 items-center cursor-pointer">
              <input
                type="radio"
                name={name}
                value={item.value}
                onChange={(e) => {
                  if (e.target.checked) {
                    switch (e.target.value) {
                      case "510":
                        router.push({
                          query: {
                            ...router.query,
                            page: 1,
                            min: 5000000,
                            max: 10000000,
                          },
                        });
                        break;
                      case "1050":
                        router.push({
                          query: {
                            ...router.query,
                            page: 1,
                            min: 10000000,
                            max: 50000000,
                          },
                        });
                        break;
                      case "50100":
                        router.push({
                          query: {
                            ...router.query,
                            page: 1,
                            min: 50000000,
                            max: 100000000,
                          },
                        });
                        break;
                      case "100":
                        const newQuery100:any = { ...router.query, page: 1, min: 100000000 }
                        delete newQuery100['max']
                        router.push({
                          query: newQuery100,
                        });
                        break;
                      case "05":
                        const newQuery:any = { ...router.query, page: 1, max: 5000000 }
                        delete newQuery['min']
                        router.push({
                          query: newQuery,
                        });
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
          </div>
        ))}
        {/* <MultiRangeSlider
					min={0}
					max={100}
					step={5}
					minValue={minValue}
					maxValue={maxValue}
					onInput={(e: ChangeResult) => {
						setMinValue(e.minValue);
						setMaxValue(e.maxValue);
					}} */}
				{/* ></MultiRangeSlider> */}
      </div>
    </div>
  );
};

export default BoxSearch;
