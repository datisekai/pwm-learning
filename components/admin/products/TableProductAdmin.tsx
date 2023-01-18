import React, { useMemo } from "react";
import { FcAddImage } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Sku } from "../../../pages/admin/product/add";

type classifyType = {
  id: string;
  text: string;
};

interface TableProductProps {
  classify1: classifyType[];
  classify2: classifyType[];
  groupClassify: classifyType[];
  dataTable: any;
  handleChange: (data: Sku[]) => void;
  skus: Sku[];
}

const TableProductAdmin: React.FC<TableProductProps> = ({
  classify1,
  classify2,
  groupClassify,
  dataTable,
  handleChange,
  skus,
}) => {
  const classify = useMemo(() => {
    const data: classifyType[] = [];
    const newClassify1 = classify1.filter((item) => item.text != "");
    const newClassify2 = classify2.filter((item) => item.text != "");
    newClassify1.forEach((item) => {
      if (newClassify2.length > 0) {
        newClassify2.forEach((element) => {
          data.push(element);
        });
      } else {
        data.push(item);
      }
    });
    return data;
  }, [classify1, classify2, groupClassify]);

  const col = [
    {
      name: groupClassify[0].text != "" ? groupClassify[0].text : "Nhóm PL 1",
    },
    {
      name:
        groupClassify.length === 2 && groupClassify[1].text != ""
          ? groupClassify[1].text
          : "Nhóm PL 2",
      hidden: groupClassify.length !== 2,
    },
    {
      name: "Giá",
    },
    {
      name: "SKU phân loại",
    },
    {
      name: "% giảm",
    },
  ];


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
      </div>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {col.map(
                (item, index) =>
                  !item.hidden && (
                    <th key={index} scope="col" className="py-3 px-1">
                      {item.name}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {dataTable?.map((item: any, index: number) => (
              <tr
                key={`${item.id}${index}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="py-4 px-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div>
                    <span>{item[0].text}</span>
                    <div className="">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          handleChangeData(
                            index,
                            "file",
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                        id={`fileImage-${index}`}
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
                {groupClassify.length === 2 && (
                  <td className="py-4 px-1">
                    {item.length === 2 && item[1].text}
                  </td>
                )}
                <td className="py-4 px-1">
                  <input
                    type="text"
                    value={skus[index].price || ""}
                    onChange={(e) =>
                      handleChangeData(index, "price", e.target.value)
                    }
                    className="w-full outline-none border rounded-md px-2 py-1"
                    placeholder="Nhập vào"
                  />
                </td>
                <td className="py-4 px-1">
                  <input
                    value={skus[index].skuPhanLoai || ""}
                    onChange={(e) =>
                      handleChangeData(index, "skuPhanLoai", e.target.value)
                    }
                    type="text"
                    className="w-full outline-none border rounded-md px-2 py-1"
                    placeholder="Nhập vào"
                  />
                </td>
                <td className="py-4 px-1">
                  <input
                    value={skus[index].discount || ""}
                    onChange={(e) =>
                      handleChangeData(index, "discount", e.target.value)
                    }
                    type="text"
                    className="w-full outline-none border rounded-md px-2 py-1"
                    placeholder="Nhập vào"
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

export default TableProductAdmin;
