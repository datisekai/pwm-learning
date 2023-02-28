import React, { FC, useEffect, useMemo, useState } from "react";
import { FcAddImage } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AttributeAdd } from "../../../models/Attribute.model";
import { Sku } from "../../../pages/admin/product/add1";

interface TableProductAdmin2Props {
  groupClassify: AttributeAdd[];
  skus: Sku[];
  dataTable: Sku[];
  handleChange: (data: Sku[]) => void;
}

const initCol = [
  { attributeId: 0, name: "Giá" },
  {
    attributeId: 0,
    name: "SKU Phân loại",
  },
  {
    attributeId: 0,
    name: "% Giảm",
  },
  {
    attributeId: 0,
    name: "Giá hiển thị",
  },
];

const TableProductAdmin2: FC<TableProductAdmin2Props> = ({
  groupClassify,
  skus,
  dataTable,
  handleChange,
}) => {
  const [col, setCol] = useState([...initCol]);

  useEffect(() => {
    if (groupClassify) {
      const groupClassifyHaveValue = groupClassify.filter(
        (item) => item.id !== 0
      );
      if (groupClassifyHaveValue.length > 0) {
        setCol([
          ...groupClassifyHaveValue.map((item) => ({
            name: item.name,
            attributeId: item.id,
          })),
          ...initCol,
        ]);
      }
    }
  }, [groupClassify]);

  const dataBody = useMemo(() => {
    if (col.length <= 4) {
      return [];
    }
    const newData = col.filter(
      (item, index) => item.attributeId !== 0 && index !== 0
    );

    return newData;
  }, [col]);

  const handleChangeData = (position: number, key: string, value: any) => {
    const data = skus.map((item, index) => {
      if (index === position) {
        if (key === "file") {
          return {
            ...item,
            [key]: value,
            preview: URL.createObjectURL(value),
          };
        } else {
          return {
            ...item,
            [key]: value,
          };
        }
      }
      return item;
    });

    handleChange(data);
  };

  const handleChangeAllSku = (key: string, value: any) => {
    handleChange(
      skus.map((item) => {
        return {
          ...item,
          [key]: value,
        };
      })
    );
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <input
          type="text"
          onChange={(e) => handleChangeAllSku("price", e.target.value)}
          className="border outline-none text-sm px-2 py-1 rounded-md"
          placeholder="Giá"
        />
        <input
          type="text"
          onChange={(e) => handleChangeAllSku("skuPhanLoai", e.target.value)}
          className="border outline-none text-sm px-2 py-1 rounded-md"
          placeholder="SKU phân loại"
        />
        <input
          type="text"
          onChange={(e) => handleChangeAllSku("discount", e.target.value)}
          className="border outline-none text-sm px-2 py-1 rounded-md"
          placeholder="% giảm"
        />
         <input
          type="text"
          onChange={(e) => handleChangeAllSku("priceDisplay", e.target.value)}
          className="border outline-none text-sm px-2 py-1 rounded-md"
          placeholder="Giá hiển thị"
        />
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {col.map((item, index) => (
                <th key={index} scope="col" className="py-3 px-1">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="py-4 px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div>
                    <span>
                      {
                        item.detailAttributes[
                          item.detailAttributes.findIndex(
                            (element) =>
                              element.attributeId === col[0].attributeId
                          )
                        ]?.name
                      }
                    </span>
                    <div className="">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        id={`fileImage-${index}`}
                        onChange={(e) =>
                          handleChangeData(
                            index,
                            "file",
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                      <label
                        htmlFor={`fileImage-${index}`}
                        className="cursor-pointer "
                      >
                        {skus[index].preview == "" ? (
                          <FcAddImage fontSize={40} />
                        ) : (
                          <LazyLoadImage
                            src={skus[index].preview}
                            className="w-[40px] h-[40px]"
                          />
                        )}
                      </label>
                    </div>
                  </div>
                </td>
                {dataBody?.map((body,index) => (
                  <td key={index} className="py-4 px-1">
                    {
                      item.detailAttributes[
                        item.detailAttributes.findIndex(
                          (element) => element.attributeId === body.attributeId
                        )
                      ]?.name
                    }
                  </td>
                ))}
                <td className="py-4 px-1">
                  <input
                    type="text"
                    className="w-full outline-none border rounded-md px-2 py-1"
                    value={skus[index].price}
                    onChange={(e) =>
                      handleChangeData(index, "price", e.target.value)
                    }
                    placeholder="Nhập vào"
                  />
                </td>
                <td className="py-4 px-1">
                  <input
                    type="text"
                    className="w-full outline-none border rounded-md px-2 py-1"
                    placeholder="Nhập vào"
                    onChange={(e) =>
                      handleChangeData(index, "skuPhanLoai", e.target.value)
                    }
                    value={skus[index].skuPhanLoai}
                  />
                </td>
                <td className="py-4 px-1">
                  <input
                    onChange={(e) =>
                      handleChangeData(index, "discount", e.target.value)
                    }
                    type="text"
                    className="w-full outline-none border rounded-md px-2 py-1"
                    placeholder="Nhập vào"
                    value={skus[index].discount}
                  />
                </td>
                <td className="py-4 px-1">
                  <input
                    onChange={(e) =>
                      handleChangeData(index, "priceDisplay", e.target.value)
                    }
                    type="text"
                    className="w-full outline-none border rounded-md px-2 py-1"
                    placeholder="Nhập vào"
                    value={skus[index].priceDisplay}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableProductAdmin2;
