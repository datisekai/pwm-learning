import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillPlusCircle, AiOutlinePlus } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ProductModel } from "../../../models/Product.model";
import { getImageServer } from "../../../utils";
import ModalUpdateProduct from "./ModalUpdateProduct";

interface ProductAdminProps{
  data:ProductModel[]
}

const ProductAdmin:React.FC<ProductAdminProps> = ({data}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  console.log(data)

  return (
    <>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
            Quản lý sản phẩm
          </h1>
          <Link href={"/admin/product/add"}>
            <div className="flex items-center px-2 py-2 rounded-lg bg-green-500 hover:bg-green-700">
              <AiFillPlusCircle fontSize={24} className="text-white" />
              <button className=" text-white ml-2">Thêm sản phẩm</button>
            </div>
          </Link>
        </div>
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className="mt-10 bg-white rounded-3xl p-4 max-h-[500px] overflow-y-scroll"
        >
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Hình ảnh
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Tên sản phẩm
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Danh mục
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Biến thể
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Ngày cập nhật
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Người đăng
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Image
                        src={getImageServer(item.thumbnail)}
                        alt="123"
                        width={50}
                        height={50}
                      />
                    </th>
                    <td className="py-4 px-6">
                      {item.name}
                    </td>
                    <td className="py-4 px-6">{item.category.name}</td>
                    <td className="py-4 px-6">{item.skus.length}</td>
                    <td className="py-4 px-6">{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
                    <td className="py-4 px-6">{item.user.email}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                      <div
                          className="bg-green-500 flex items-center justify-center text-white p-1 rounded-md hover:bg-green-700 cursor-pointer"
                        >
                          <AiOutlinePlus fontSize={24} />
                        </div>
                        <div
                          onClick={() => setOpenModal(true)}
                          className="bg-primary flex items-center justify-center text-white p-1 rounded-md hover:bg-primaryHover cursor-pointer"
                        >
                          <CiEdit fontSize={24} />
                        </div>
                        <div
                          onClick={() => setOpenConfirm(true)}
                          className=" bg-red-500 flex items-center justify-center text-white p-1 rounded-md hover:bg-red-700 cursor-pointer"
                        >
                          <RiDeleteBin6Line fontSize={24} />
                        </div>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalUpdateProduct
        handleClose={() => setOpenModal(false)}
        open={openModal}
      />
    </>
  );
};

export default ProductAdmin;
