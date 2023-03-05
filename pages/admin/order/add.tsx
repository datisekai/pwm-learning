import { useMutation, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Select from "react-select";
import OrderAction from "../../../actions/Order.action";
import SkuAction from "../../../actions/Sku.action";
import UserAction from "../../../actions/User.action";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Meta from "../../../components/Meta";
import { v4 as uuidv4 } from "uuid";
import { formatPrices, getImageServer } from "../../../utils";
import { Skuvalue } from "../../../models/Sku.model";
import { TbSum } from "react-icons/tb";
import dataStatus from "../../../components/data/status";

export interface Sku {
  id: number;
  productId: number;
  image: string | null;
  discount: number;
  sku: string;
  qty: number;
  productName: string;
  price: number;
  uuid: string;
  skuvalues: Skuvalue[];
}


interface Product {
  id: number;
  name: string;
  productId: number;
}
interface AddOrderProps {}

const initNewSku = (uuid: string) => ({
  id: 0,
  discount: 0,
  image: "",
  price: 0,
  productId: 0,
  productName: "",
  qty: 0,
  sku: "",
  uuid,
  skuvalues: [],
});

type InfoForm = {
  customer: {
    value: number;
    label: string;
  } | null;
  status:{
    value:number
    label:string
  } | null,
  address:string,
  phone:string
};

const AddOrder: React.FC<AddOrderProps> = () => {
  const { data: users } = useQuery(["users"], UserAction.getAll);

  const { data: products } = useQuery(["products"], SkuAction.getAll);

  const [info, setInfo] = useState<InfoForm>({
    customer: null,
    status: null,
    address: "",
    phone: "",
  });

  const router = useRouter();

  const [skus, setSkus] = useState<Sku[]>([initNewSku(uuidv4())]);

  const { mutate, isLoading } = useMutation(OrderAction.addByAdmin, {
    onSuccess: () => {
      toast.success("Thêm thành công");
      router.push("/admin/order");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleChangeInfo = (e: any, key: string) => {
    setInfo({ ...info, [key]: e });
  };

  const handleAdd = async () => {
    if (!info.customer) {
      toast.error("Vui lòng chọn khách hàng");
      return;
    }

    if (!info.phone) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }

    if (!info.status) {
      toast.error("Vui lòng chọn tình trạng");
      return;
    }

    const isUnique = skus.reduce((pre, cur) => {
      if(skus.some(item => item.id === cur.id && item.uuid !== cur.uuid)){
        return false;
      }
      return pre;
    },true)

    if(!isUnique){
      toast.error("Không được chọn 2 sản phẩm cùng loại")
      return;
    }

    if(skus.length === 0 && skus[0].id === 0){
      toast.error("Vui lòng chọn sản phẩm")
      return;
    }

    if(skus.some(item => item.id === 0)){
      toast.error("Vui lòng chọn sản phẩm hoặc xóa đi nếu không sử dụng")
      return;
    }

    const payload = {
      phone: info.phone,
      address: info.address || "Không có",
      customerId: info.customer.value,
      status:info.status.value,
      skus
    };

    mutate(payload)
  };

  const total = useMemo(() => {
    return skus.reduce(
      (pre, cur) =>
        pre + (cur.price - (cur.price * cur.discount) / 100) * cur.qty,
      0
    );
  }, [skus]);

  return (
    <>
      <Meta
        image="/images/logo.jpg"
        title="Thêm đơn hàng | Admin"
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
                        value={info.customer}
                        className="h-[34px] outline-none border rounded-lg w-full"
                        onChange={(e) => handleChangeInfo(e, "customer")}
                        options={
                          users?.map((item) => ({
                            value: item.id,
                            label: `${item.email} ${
                              item.phone ? `- ${item.phone}` : ""
                            } ${item.name ? `- ${item.name}` : ""}`,
                          })) || []
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center">
                    <span className="w-[100px]">Số điện thoại</span>
                    <div className="ml-4 flex-1">
                      <input
                        className="css-field"
                        placeholder="Nhập vào"
                        value={info.phone}
                        onChange={(e) =>
                          setInfo({ ...info, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center">
                    <span className="w-[100px]">Địa chỉ</span>
                    <div className="ml-4 flex-1">
                      <input
                        type="text"
                        className="css-field"
                        placeholder="Nhập vào"
                        value={info.address}
                        onChange={(e) =>
                          setInfo({ ...info, address: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-baseline">
                    <span className="w-[100px] ">Tình trạng</span>
                    <div className="ml-4 flex-1 items-baseline">
                      <Select
                        className="h-[34px] outline-none border rounded-lg w-full"
                        value={info.status}
                        onChange={(e) => handleChangeInfo(e, "status")}
                        options={
                          dataStatus?.map((item) => ({
                            value: item.value,
                            label: `${item.value} - ${item.text}`,
                          })) || []
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline">
                    <span className="w-[100px] ">Sản phẩm</span>
                    <div className="ml-4 flex-1 items-baseline">
                      <div className="mb-2 grid grid-cols-1 gap-2">
                        {skus.map((item, index) => (
                          <div key={item.uuid} className="flex items-center">
                            <Select
                              name="product"
                              className="h-[34px] outline-none border rounded-lg w-full"
                              onChange={(e) => {
                                const currentSku = products?.find(
                                  (element) => element.id === e?.value
                                );

                                if (currentSku) {
                                  setSkus(
                                    skus.map((element) => {
                                      if (element.uuid === item.uuid) {
                                        return {
                                          discount: currentSku?.discount || 0,
                                          id: currentSku.id,
                                          image: currentSku?.image || "",
                                          price: currentSku?.price || 0,
                                          productId:
                                            +currentSku?.productId || 0,
                                          productName:
                                            currentSku?.product.name || "",
                                          qty: 1,
                                          sku: currentSku?.sku || "",
                                          uuid: element.uuid,
                                          skuvalues: currentSku.skuvalues,
                                        };
                                      }
                                      return element;
                                    })
                                  );
                                }
                              }}
                              options={
                                products?.map((item) => ({
                                  value: item.id,
                                  label: `[${item.skuvalues
                                    .map(
                                      (element) =>
                                        `${element.attribute.name}: ${element.detailattribute.name}`
                                    )
                                    .join(", ")}] - ${item.product.name} - ${
                                    item.priceDisplay ||
                                    formatPrices(
                                      item.price -
                                        (item.price * item.discount) / 100
                                    )
                                  }`,
                                })) || []
                              }
                            />
                            <div
                              onClick={() =>
                                skus.length > 1 &&
                                setSkus(
                                  skus.filter(
                                    (element) => element.uuid !== item.uuid
                                  )
                                )
                              }
                              className="p-1 cursor-pointer"
                            >
                              <AiOutlineDelete className="text-[16px] lg:text-[22px]" />
                            </div>
                            {index === skus.length - 1 && (
                              <div
                                onClick={() =>
                                  setSkus([...skus, initNewSku(uuidv4())])
                                }
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
                    <button onClick={handleAdd} className="text-white bg-primary  py-1 rounded-lg w-[150px]">
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
                <div className="flex mt-2 border-b-2 pb-2 justify-between items-center">
                  <div className="flex space-x-1 items-center">
                    <TbSum className="text-[16px] md:text-[22px]" />
                    <label>Tổng đơn hàng</label>
                  </div>
                  <span className="text-primary">{formatPrices(total)}</span>
                </div>
                <div className="mt-2 max-h-[450px] lg:max-w-none overflow-scroll">
                  <div className="relative">
                    <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="py-3 px-1">
                            Hình ảnh
                          </th>
                          <th scope="col" className="py-3 px-1">
                            Sản phẩm
                          </th>
                          <th scope="col" className="py-3 px-1">
                            Đơn giá
                          </th>
                          <th scope="col" className="py-3 px-1">
                            Loại
                          </th>
                          <th scope="col" className="py-3 px-1">
                            Số lượng
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {skus[0].id !== 0 &&
                          skus.map(
                            (item) =>
                              item.id !== 0 && (
                                <tr
                                  key={item.uuid}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                  <td className="py-4 px-2 break-words max-w-[300px] min-w-[80px]">
                                    {item.image ? (
                                      <LazyLoadImage
                                        src={getImageServer(item.image)}
                                        className="m-auto w-[50px] h-[50px]"
                                      />
                                    ) : (
                                      "Không có"
                                    )}
                                  </td>
                                  <td className="py-4 px-1 break-words max-w-[300px] min-w-[120px]">
                                    {item.productName.length > 20
                                      ? item.productName.substring(0, 20) +
                                        "..."
                                      : item.productName}
                                  </td>

                                  <td className="py-4 px-1">
                                    {formatPrices(
                                      item.price -
                                        (item.price * item.discount) / 100
                                    )}
                                  </td>
                                  <td className="py-4 px-1 break-words max-w-[300px] min-w-[120px]">
                                    {item?.skuvalues
                                      .map(
                                        (element) =>
                                          `${element.attribute.name}: ${element.detailattribute.name}`
                                      )
                                      .join(", ")}
                                  </td>
                                  <td className="py-4 px-1">
                                    <input
                                      onChange={(e) => {
                                        setSkus(
                                          skus.map((element) => {
                                            if (element.uuid === item.uuid) {
                                              return {
                                                ...element,
                                                qty: +e.target.value,
                                              };
                                            }
                                            return element;
                                          })
                                        );
                                      }}
                                      type="number"
                                      className="w-full outline-none border rounded-md px-2 py-1"
                                      placeholder="Nhập vào"
                                      value={item.qty}
                                    />
                                  </td>
                                </tr>
                              )
                          )}
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
