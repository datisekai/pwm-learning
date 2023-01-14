import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";
import { FcAddImage } from "react-icons/fc";
import TextField from "../../../components/customs/TextField";
import { useForm } from "react-hook-form";
import Select from "../../../components/customs/Select";
import TextArea from "../../../components/customs/TextArea";
import { GrClose } from "react-icons/gr";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import TableProductAdmin from "../../../components/admin/products/TableProductAdmin";
import { LazyLoadImage } from "react-lazy-load-image-component";

export interface Sku {
  price: string;
  discount: string;
  file?: File;
  preview: string;
  skuPhanLoai: string;
}

const AddProduct = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      description: "",
    },
  });

  const [groupClassify, setGroupClassify] = useState([
    {
      id: uuidv4(),
      text: "",
    },
  ]);

  const [classify1, setClassify1] = useState([
    {
      id: uuidv4(),
      text: "",
    },
  ]);

  const [classify2, setClassify2] = useState([
    {
      id: uuidv4(),
      text: "",
    },
  ]);

  const [thumbnail, setThumbnail] = useState<any>();
  const [preview, setPreview] = useState("");

  const [skus, setSkus] = useState<Sku[]>([]);

  const maxLength = 120;

  const name = watch("name");

  const handleAdd = (data: any) => {};

  const isExistElement = (array: any) => {
    if (array.length > 0 && array[0].text != "") {
      return true;
    }

    return false;
  };

  const dataTable = useMemo(() => {
    const data: any = [];
    classify1.forEach((item) => {
      if (item.text != "") {
        if (!isExistElement(classify2)) {
          data.push([item]);
        } else {
          classify2.forEach((element) => {
            if (element.text != "") {
              data.push([item, element]);
            }
          });
        }
      }
    });

    setSkus(
      data.map(() => ({
        price: "",
        discount: "",
        preview: "",
        file: null,
        skuPhanLoai: "",
      }))
    );

    return data;
  }, [classify1, classify2]);

  return (
    <>
      <AdminLayout>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
              Gán quyền
            </h1>
          </div>
          <div className="flex flex-col md:flex-row mt-10">
            <div
              className="p-4 rounded-3xl  flex flex-col md:flex-row w-full"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="w-full">
                <h2 className="font-bold">Các chức năng</h2>
                <div className="mt-5">
                  <div className="grid mt-5 grid-cols-3 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5].map((item) => {
                      return (
                        <div
                          key={item}
                          style={{
                            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          }}
                          className="flex items-center justify-between p-4 rounded-3xl"
                        >
                          <div className="w-full overflow-auto">
                            <p className="text-primary text-xl font-bold">
                              Quản lý sản phẩm
                            </p>
                            <div className="mt-5 overflow-auto">
                              <p className="flex float-left text-l font-bold">
                                Xem
                              </p>
                              <label className="switch flex float-right">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                              </label>
                            </div>
                            <div className="mt-5 overflow-auto">
                              <p className="flex float-left text-l font-bold">
                                Thêm
                              </p>
                              <label className="switch flex float-right">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                              </label>
                            </div>
                            <div className="mt-5 overflow-auto">
                              <p className="flex float-left text-l font-bold">
                                Sửa
                              </p>
                              <label className="switch flex float-right">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                              </label>
                            </div>
                            <div className="mt-5 overflow-auto">
                              <p className="flex float-left text-l font-bold">
                                Xóa
                              </p>
                              <label className="switch flex float-right">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleSubmit(handleAdd)}
                      className="text-white bg-primary  py-1 rounded-md w-[100px]"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AddProduct;
