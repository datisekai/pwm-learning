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
import ProductAction from "../../../actions/Product.action";
import UserAction from "../../../actions/User.action";
import OrderAction from "../../../actions/Order.action";
import Select from 'react-select'
import TextArea from "../../../components/customs/TextArea";
import TextField from "../../../components/customs/TextField";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Meta from "../../../components/Meta";
import { ProductDetailModel } from "../../../models/ProductDetail.model";
import { ProductAdd } from "../../../models/Product.model";
import { getCombinationsByAttributeId, uploadImg } from "../../../utils";

export interface Sku {
  price: string;
  discount: string;
  file: File | undefined;
  preview: string;
  skuPhanLoai: string;
  detailProducts: Product[];
}

interface Product {
  id: number;
  name: string;
  productId: number;
}
interface AddOrderProps {}

const AddOrder: React.FC<AddOrderProps> = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      user: "",
      description: "",
    },
  });

  const { data: users } = useQuery(["users"], UserAction.getAll);

  const { data: products } = useQuery(["products"], ProductAction.getAll);

  const initGroupClassify = (uuid: string) => ({
    detailproducts: [],
    id: 0,
    name: "",
    uuid,
  });

  const [groupClassify, setGroupClassify] = useState<ProductAdd[]>([
    initGroupClassify(uuidv4()),
  ]);

  const router = useRouter();

  const [thumbnail, setThumbnail] = useState<any>();
  const [preview, setPreview] = useState("");

  const [skus, setSkus] = useState<Sku[]>([]);

  const maxLength = 120;

  const name = watch("name");

  const { mutate, isLoading } = useMutation(OrderAction.add, {
    onSuccess: () => {
      toast.success("Thêm thành công");
      router.push("/admin/order");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleAdd = async (data: any) => {
    if (!thumbnail) {
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

    let avatar = await uploadImg(thumbnail);

    let images = await Promise.all(
      skus.map((item) => (item.file ? uploadImg(item.file) : null))
    );

    const skusSending = skus.map((item, index) => {
      return {
        price: item.price,
        discount: item.discount,
        sku: item.skuPhanLoai,
        image: images[index],
        detailProducts: item.detailProducts,
      };
    });

    const sending = {
      name: data.name,
      userId: data.user,
      description: data.description,
      thumbnail: avatar,
      products: groupClassify.map((item) => +item.id),
      skus: skusSending,
    };

    mutate(sending);
  };

  const dataTable = useMemo(() => {
    if (groupClassify.length === 1 && groupClassify[0].id === 0) {
      return [];
    }

    const listDetails: ProductDetailModel[] = groupClassify.reduce(
      (pre: any, cur) => {
        if (cur.id !== 0) {
          return [...pre, ...cur.productattributes];
        }
        return pre;
      },
      []
    );

    // const logTest = getCombinationsByAttributeId(listDetails);
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
              Thêm đơn hàng
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row mt-10">
            <div
              className="p-4 rounded-3xl flex flex-col lg:flex-row w-full lg:w-[60%]"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="w-full">
                <h2 className="font-bold">Thông tin cơ bản</h2>
                <div className="mt-5">
                  <div className="mt-2 flex items-center">
                    <span className="w-[100px]">Khách hàng</span>
                    <div className="ml-4 flex-1">
                      <Select
                 
                        name="user"    
                        className="h-[34px] outline-none border rounded-lg w-full"
                        options={
                          users?.map((item) => ({
                            value: item.id,
                            label: item.email,
                          })) || []
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline">
                    <span className="w-[100px] ">Sản phẩm</span>
                    <div className="ml-4 flex-1 items-baseline">
                      <div className="mb-2">
                        {groupClassify.map((item, index) => (
                          <div key={item.id} className="flex items-center">
                            <Select
                              name="product"

                              className="h-[34px] outline-none border rounded-lg w-full"
                              options={
                                products?.map((item) => ({
                                  value: item.id,
                                  label: item.name,
                                })) || []
                              }
                            />
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
                              <AiOutlineDelete className="text-[16px] lg:text-[22px]" />
                            </div>
                            {index === groupClassify.length - 1 && (
                              <div
                                // onClick={() =>
                                // //   setGroupClassify([
                                // //     ...groupClassify,
                                // //     initGroupClassify(uuidv4()),
                                // //   ])
                                // }
                                className="p-1 cursor-pointer"
                              >
                                <AiOutlinePlus className="text-[16px] lg:text-[22px] " />
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
                      className="text-white bg-primary  py-1 rounded-lg w-[150px]"
                    >
                      Lưu đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-3 rounded-3xl mt-4 lg:mt-0 flex flex-col lg:flex-row w-full lg:w-[40%] lg:ml-4"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="w-full">
                <h2 className="p-1 font-bold">Đơn hàng</h2>
                <div className="mt-7 max-h-[450px] lg:max-w-none overflow-scroll">
                  <div className="relative">
                    <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="py-3 px-1"></th>
                          <th scope="col" className="py-3 px-1">
                            Sản phẩm
                          </th>
                          <th scope="col" className="py-3 px-1">
                            Đơn giá
                          </th>
                          <th scope="col" className="py-3 px-1">
                            Số lượng
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="py-4 px-2 break-words max-w-[300px] min-w-[80px]">
                            <LazyLoadImage
                              src={"../../images/2.jpg"}
                              className="m-auto w-[50px] h-[50px]"
                            />
                          </td>
                          <td className="py-4 px-1 break-words max-w-[300px] min-w-[120px]">
                            Bộ trang sức kim cương
                          </td>
                          <td className="py-4 px-1">1.000.000 đ</td>
                          <td className="py-4 px-1">2</td>
                        </tr>
                      </tbody>
                    </table>
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

export default AddOrder;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const detailActions = JSON.parse(req.cookies["detailActions"] || "[]");

  //   if (detailActions.includes("order:add")) {
  return {
    props: {},
  };
  //   }

  //   return {
  //     props: {},
  //     redirect: {
  //       destination: "/admin",
  //     },
  //   };
};
