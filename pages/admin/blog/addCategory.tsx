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

const AddCategoryBlog = () => {
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
              Thêm sản phẩm
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
                <h2 className="font-bold">Thông tin cơ bản</h2>
                <div className="mt-5">
                  <div className="flex items-center mt-2 ">
                    <span className="w-[150px]">Tên danh mục blog</span>
                    <div className="flex-1 ml-4 ">
                      <div className=" flex items-center border rounded-md">
                        <TextField
                          control={control}
                          error={errors}
                          showError={false}
                          rules={{
                            required: "Không được để trống ô",
                            minLength: {
                              value: 5,
                              message:
                                "Tên danh mục của bạn quá ngắn. Vui lòng nhập ít nhất 5 kí tự",
                            },
                            maxLength: {
                              value: 120,
                              message:
                                "Tên sản phẩm của bạn quá dài. Vui lòng nhập tối đa 120 kí tự",
                            },
                          }}
                          name="name"
                          placeholder="Nhập vào"
                          className="w-full px-4 py-1 rounded-md outline-none"
                        />
                        <div className="border-l px-2 text-[#666]">
                          {name.length}/{maxLength}
                        </div>
                      </div>
                      <p className="py-1 text-primary text-sm">
                        {errors["name"] && errors["name"].message}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Trạng thái</span>
                    <div className="ml-4 flex-1">
                      <Select
                        error={errors}
                        name="category"
                        rules={{
                          required: "Không được để trống ô",
                        }}
                        control={control}
                        className="px-4 h-[34px] outline-none border rounded-md w-full"
                        data={[
                          { value: 0, text: "Công khai" },
                          { value: 1, text: "Riêng tư" },
                        ]}
                      />
                    </div>
                  </div>
                              

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleSubmit(handleAdd)}
                      className="text-white bg-primary  py-1 rounded-md w-[150px]"
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

export default AddCategoryBlog;
