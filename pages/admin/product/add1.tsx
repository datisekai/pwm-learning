import { useMutation, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { v4 as uuidv4 } from "uuid";
import AttributeAction from "../../../actions/Attribute.action";
import CategoryAction from "../../../actions/Category.action";
import ProductAction from "../../../actions/Product.action";
import TableProductAdmin2 from "../../../components/admin/products/TableProductAdmin2";
import Select from "../../../components/customs/Select";
import TextArea from "../../../components/customs/TextArea";
import TextField from "../../../components/customs/TextField";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Meta from "../../../components/Meta";
import TranslationArea from "../../../components/TranslationArea";
import { AttributeAdd, Detailattribute } from "../../../models/Attribute.model";
import {
  getCombinationsByAttributeId,
  isNumber,
  uploadImg,
} from "../../../utils";

export interface Sku {
  price: string;
  discount: string;
  file: File | undefined;
  preview: string;
  skuPhanLoai: string;
  detailAttributes: Attribute[];
  priceDisplay: string;
}

interface Attribute {
  id: number;
  name: string;
  attributeId: number;
}
interface AddProductProps {}

const AddProduct: React.FC<AddProductProps> = () => {
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

  const { data: categories } = useQuery(["categories"], CategoryAction.getAll);

  const { data: attributes } = useQuery(["attributes"], AttributeAction.getAll);

  const initGroupClassify = (uuid: string) => ({
    detailattributes: [],
    id: 0,
    name: "",
    uuid,
  });

  const [groupClassify, setGroupClassify] = useState<AttributeAdd[]>([
    initGroupClassify(uuidv4()),
  ]);

  const router = useRouter();

  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const [preview, setPreview] = useState([]);

  const [skus, setSkus] = useState<Sku[]>([]);

  const maxLength = 120;

  const name = watch("name");

  const { mutate, isLoading } = useMutation(ProductAction.add1, {
    onSuccess: () => {
      toast.success("Thêm thành công");
      router.push("/admin/product");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleAdd = async (data: any) => {
    if (!thumbnails || thumbnails.length <= 0) {
      toast.error("Vui lòng chọn hình ảnh chính");
      return;
    }

    if (groupClassify.length == 1 && groupClassify[0].id === 0) {
      toast.error("Vui lòng chọn phân loại");
      return;
    }

    if (groupClassify.some((item) => item.id === 0)) {
      toast.error("Vui lòng nhập đầy đủ phân loại hoặc xóa nếu không sử dụng");
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


    
    if (
      skus.some((item) => !isNumber(item.price) || !isNumber(item.discount))
    ) {
      toast.error("Giá và % giảm phải là số");
      return;
    }

    let avatars = await Promise.all(
      Array.from(thumbnails).map((item) => uploadImg(item))
    );

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

    const sending = {
      name: data.name,
      categoryId: data.category,
      description: data.description,
      thumbnails: avatars,
      thumbnail: avatars[0],
      attributes: groupClassify.map((item) => +item.id),
      skus: skusSending,
    };

    mutate(sending);
  };

  const dataTable = useMemo(() => {
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
      priceDisplay: "",
    }));

    setSkus(newData);
    return newData;
  }, [groupClassify]);

  return (
    <>
      <Meta
        image="/images/logo.jpg"
        title="Thêm sản phẩm | Admin"
        description=""
      />
      <AdminLayout>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
              Thêm sản phẩm
            </h1>
          </div>
          <div className="flex flex-col md:flex-row mt-10">
            <div
              className="p-4 rounded-3xl  flex flex-col md:flex-row w-full md:w-[60%]"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="w-full">
                <h2 className="font-bold">Thông tin cơ bản</h2>
                <div className="mt-5">
                  <div className="flex items-center">
                    <span className="w-[150px]">Hình ảnh chính</span>
                    <div className="ml-4 ">
                      <input
                        type="file"
                        multiple={true}
                        onChange={(e) => {
                          const files: any = e.target.files
                            ? e.target.files
                            : null;
                          if (files) {
                            const currentPreviews: any = [];
                            for (let i = 0; i < files.length; i++) {
                              currentPreviews.push(
                                URL.createObjectURL(files[i])
                              );
                            }
                            setPreview(currentPreviews);
                            setThumbnails(files);
                          }
                        }}
                        className="hidden"
                        name=""
                        id="mainImage"
                        accept="image/*"
                      />
                      <label htmlFor="mainImage" className="cursor-pointer ">
                        {preview && preview.length > 0 ? (
                          <div className="flex flex-wrap items-center space-x-2 space-y-1">
                            {preview.map((item, index) => (
                              <div key={index}>
                                <LazyLoadImage
                                  src={item}
                                  className="w-[40px] h-[40px]"
                                  effect="blur"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <FcAddImage fontSize={40} />
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 ">
                    <span className="w-[150px]">Tên sản phẩm</span>
                    <div className="flex-1 ml-4 ">
                      <div className=" flex items-center border rounded-md">
                        <TextField
                          control={control}
                          error={errors}
                          showError={false}
                          rules={{
                            required: "Không được để trống ô",
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
                    <span className="w-[150px]">Thể loại</span>
                    <div className="ml-4 flex-1">
                      <Select
                        error={errors}
                        name="category"
                        rules={{
                          required: "Không được để trống ô",
                        }}
                        control={control}
                        className="px-4 h-[34px] outline-none border rounded-md w-full"
                        data={
                          categories?.map((item) => ({
                            value: item.id,
                            text: item.name,
                          })) || []
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Mô tả sản phẩm</span>
                    <div className="ml-4 flex-1">
                      <TextArea
                        control={control}
                        error={errors}
                        rules={{
                          required: "Không được để trống ô",
                        }}
                        name="description"
                        placeholder="Nhập vào"
                        className="w-full border px-4 py-1 rounded-md outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Phân loại hàng</span>
                    <div className="ml-4 flex-1">
                      <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
                        {groupClassify.map((item, index) => (
                          <div key={item.id} className="flex items-center">
                            <select
                              value={item.id}
                              onChange={(e) => {
                                const selectedElement = attributes?.find(
                                  (element) => element.id === +e.target.value
                                );

                                const isExist = groupClassify.some(
                                  (element) =>
                                    element.id === selectedElement?.id
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

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleSubmit(handleAdd)}
                      className="text-white bg-primary  py-1 rounded-md w-[150px]"
                    >
                      Lưu sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-4 rounded-3xl mt-4 md:mt-0 flex flex-col md:flex-row w-full md:w-[40%] md:ml-4"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="">
                <h2 className="font-bold">Thông tin biến thể</h2>
                <div className="mt-5">
                  <TableProductAdmin2
                    skus={skus}
                    groupClassify={groupClassify}
                    dataTable={dataTable}
                    handleChange={(data: Sku[]) => setSkus(data)}
                  />
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const detailActions = JSON.parse(req.cookies["detailActions"] || "[]");

  if (detailActions.includes("product:add")) {
    return {
      props: {},
    };
  }

  return {
    props: {},
    redirect: {
      destination: "/admin",
    },
  };
};
