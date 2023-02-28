import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import ProductAction from "../../../actions/Product.action";
import { AttributeAdd, AttributeModel } from "../../../models/Attribute.model";
import { Detailattribute, ProductModel } from "../../../models/Product.model";
import { Sku } from "../../../pages/admin/product/add1";
import { getCombinationsByAttributeId, uploadImg } from "../../../utils";
import TableProductAdmin2 from "./TableProductAdmin2";

interface ModalUpdateProductAttProps {
  open: boolean;
  handleClose: () => void;
  current: ProductModel;
  attributes: AttributeModel[] | undefined;
}

const ModalUpdateProductAtt: React.FC<ModalUpdateProductAttProps> = ({
  handleClose,
  open,
  current,
  attributes,
}) => {
  const initGroupClassify = (uuid: string) => ({
    detailattributes: [],
    id: 0,
    name: "",
    uuid,
  });

  const [groupClassify, setGroupClassify] = React.useState<AttributeAdd[]>([
    initGroupClassify(uuidv4()),
  ]);

  const currentAttributes = React.useMemo(() => {
    if (current) {
      return current.productattributes.map((item) => item.attributeId);
    }
    return [];
  }, [current]);

  const currentGroupClassify = React.useMemo(() => {
    if (groupClassify) {
      const groupExist = groupClassify.filter((item) => item.id !== 0);
      return groupExist.map((item) => item.id);
    }
    return [];
  }, [groupClassify]);

  useEffect(() => {
    if (current) {
      setGroupClassify(
        current.productattributes.map((item) => ({
          detailattributes: item.attribute.detailattributes,
          id: item.attribute.id,
          name: item.attribute.name,
          uuid: uuidv4(),
        }))
      );
    }
  }, [current]);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(ProductAction.updateAttr, {
    onSuccess: (data, variables) => {
      const dataOld: ProductModel[] =
        queryClient.getQueryData(["products", router.asPath]) || [];
      queryClient.setQueryData(
        ["products", router.asPath],
        dataOld.map((item) => (item.id === data.id ? data : item))
      );
      toast.success("Cập nhật thành công");
      handleClose();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleUpdate = async () => {
    if (
      JSON.stringify(currentAttributes) === JSON.stringify(currentGroupClassify)
    ) {
      toast.success("Cập nhật thành công");
      return;
    }

    if (
      skus.some(
        (item) =>
          item.discount.trim() == "" ||
          item.price.trim() == "" ||
          item.skuPhanLoai.trim() == ""
      )
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin biến thể");
      return;
    }

    let images = await Promise.all(
      skus.map((item) => (item.file ? uploadImg(item.file) : null))
    );

    const skusSending = skus.map((item, index) => {
      return {
        price: item.price,
        discount: item.discount,
        sku: item.skuPhanLoai,
        image: images[index],
        detailAttributes: item.detailAttributes,
      };
    });
    const data = {
      productId: current.id,
      attributes: currentGroupClassify,
      skus: skusSending,
    };

    mutate(data);
  };

  const [skus, setSkus] = React.useState<Sku[]>([]);

  const dataTable = React.useMemo(() => {
    if (groupClassify.length === 1 && groupClassify[0].id === 0) {
      return [];
    }

    const listDetails: Detailattribute[] = groupClassify.reduce(
      (pre: any, cur) => {
        if (cur.id !== 0) {
          return [...pre, ...cur.detailattributes];
        }
        return pre;
      },
      []
    );

    const logTest = getCombinationsByAttributeId(listDetails);

    const newData: Sku[] = logTest.map((item) => ({
      sku: "",
      price: "",
      discount: "",
      file: undefined,
      preview: "",
      detailAttributes: item,
      skuPhanLoai: "",
      priceDisplay:""
    }));

    setSkus(newData);
    return newData;
  }, [groupClassify]);

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div className="w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] ">
        <h2 className="font-bold">Cập nhật sản phẩm</h2>
        <div className="mt-4 space-y-2">
          <div className="flex flex-col ">
            <label className="whitespace-nowrap ">Phân loại hàng</label>
            <div className="grid grid-cols-2 mt-2 lg:grid-cols-2 gap-2">
              {groupClassify.map((item, index) => (
                <div key={item.id} className="flex items-center">
                  <select
                    value={item.id}
                    onChange={(e) => {
                      const selectedElement = attributes?.find(
                        (element) => element.id === +e.target.value
                      );

                      const isExist = groupClassify.some(
                        (element) => element.id === selectedElement?.id
                      );

                      if (isExist) {
                        toast.error("Phân loại này đã được chọn");
                        return;
                      }

                      if (selectedElement) {
                        setGroupClassify(
                          groupClassify.map((element) => {
                            if (element.uuid === item.uuid) {
                              return {
                                ...element,
                                ...selectedElement,
                              };
                            }
                            return element;
                          })
                        );
                      }
                    }}
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected={false}>Chọn phân loại</option>
                    {attributes?.map((item) => (
                      <option value={item.id} key={item.id}>{`${
                        item.name
                      } (${item.detailattributes
                        .map((childItem) => childItem.name)
                        .join(", ")})`}</option>
                    ))}
                  </select>
                  <div
                    onClick={() =>
                      groupClassify.length > 1 &&
                      setGroupClassify(
                        groupClassify.filter(
                          (element) => element.uuid !== item.uuid
                        )
                      )
                    }
                    className="p-1 cursor-pointer"
                  >
                    <AiOutlineDelete className="text-[16px] md:text-[22px]" />
                  </div>
                  {index === groupClassify.length - 1 && (
                    <div
                      onClick={() =>
                        setGroupClassify([
                          ...groupClassify,
                          initGroupClassify(uuidv4()),
                        ])
                      }
                      className="p-1 cursor-pointer"
                    >
                      <AiOutlinePlus className="text-[16px] md:text-[22px] " />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {JSON.stringify(currentAttributes) !==
          JSON.stringify(currentGroupClassify) && (
          <div className="mt-4 border-t pt-2">
            <div className="mb-2">Thông tin biến thể</div>
            <div className="max-h-[300px] overflow-y-scroll">
              <TableProductAdmin2
                skus={skus}
                groupClassify={groupClassify}
                dataTable={dataTable}
                handleChange={(data: Sku[]) => setSkus(data)}
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleClose}
            type="button"
            className="text-gray-500 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Đóng
          </button>
          <button
            disabled={isLoading}
            onClick={handleUpdate}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateProductAtt;
