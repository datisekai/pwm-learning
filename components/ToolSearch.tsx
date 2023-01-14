import React from "react";
import BoxSearch from "./boxs/BoxSearch";

const dataPrice = [
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

const dataCategory = [
    {
      value: "1",
      text: "Kim cương",
    },
    {
      value: "2",
      text: "Nhẫn",
    },
    {
      value: "3",
      text: "Hoa tai",
    },
    {
      value: "4",
      text: "Mặt dây",
    },
  ];

const ToolSearch = () => {
  return (
    <div className="w-[250px] border-2 rounded-lg grid grid-cols-1 gap-y-4 p-4">
      <BoxSearch data={dataPrice} name="price" title="Mức giá" />
      <BoxSearch data={dataCategory} name="category" title="Thể loại" />
      <BoxSearch data={dataPrice} name="price" title="Mức giá" />
      <BoxSearch data={dataCategory} name="category" title="Thể loại" />
    </div>
  );
};

export default ToolSearch;
