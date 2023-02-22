import { useRouter } from "next/router";
import React, { FC } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { CategoryModel } from "../models/Category.model";
import { SpeciesModel } from "../models/Species.model";
import BoxSearch from "./boxs/BoxSearch";
import ItemSearch from "./boxs/ItemSearch";

const dataPrice = [
  {
    value: "05",
    text: "Dưới 5 triệu",
  },
  {
    value: "510",
    text: "Từ 5 - 10 triệu",
  },
  {
    value: "1050",
    text: "Từ 10 - 50 triệu",
  },
  {
    value: "50100",
    text: "Từ 50 - 100 triệu",
  },
  {
    value: "100",
    text: "Trên 100 triệu",
  },
];

interface ToolSearchProps {
  species: SpeciesModel[];
}

const ToolSearch: FC<ToolSearchProps> = ({ species }) => {
  const router = useRouter();
  return (
    <>
      <div className="hidden md:grid w-[250px] border-2 rounded-lg grid-cols-1 gap-y-4 p-4">
        <BoxSearch data={dataPrice} name="price" title="Mức giá" />

        <div className="border-b-2 pb-2 last:border-none">
          <h2 className="font-bold uppercase">Danh mục</h2>
          <div className="mt-4">
            {species?.map((item) => (
              <ItemSearch key={item.id} data={item} />
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push({ query: {} })}
          className="py-2 px-4 dark:text-black rounded-md bg-slate-200 hover:bg-slate-400"
        >
          Xóa bộ lọc
        </button>
      </div>
      <div className="md:hidden block w-full border-2 rounded-lg grid grid-cols-2 gap-y-4 p-4">
        <BoxSearch data={dataPrice} name="price" title="Mức giá" />

        <div className="border-b-2 pb-2 last:border-none">
          <h2 className="font-bold uppercase">Danh mục</h2>
          <div className="mt-4">
            {species?.map((item) => (
              <ItemSearch key={item.id} data={item} />
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push({ query: {} })}
          className="col-end-3 py-2 px-4 dark:text-black rounded-md bg-slate-200 hover:bg-slate-400"
        >
          Xóa bộ lọc
        </button>
      </div>
    </>
  );
};

export default ToolSearch;
