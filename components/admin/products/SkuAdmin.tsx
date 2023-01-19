import Image from "next/image";
import Link from "next/link";
import React, { FC, useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SkuModel } from "../../../models/Sku.model";
import { formatPrices, getImageServer } from "../../../utils";
import { useMutation } from "@tanstack/react-query";
import SkuAction from "../../../actions/Sku.action";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import swal from "sweetalert";
import ModalUpdateSku from "./ModalUpdateSku";
import { AuthContext } from "../../context";
import SearchAdmin from "../../SearchAdmin";

interface SkuAdminProps {
  data: SkuModel[];
}

const SkuAdmin: FC<SkuAdminProps> = ({ data }) => {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<any>();
  const [search, setSearch] = useState("");
  const [currentProduct, setCurrentProduct] = useState(data);
  const router = useRouter();

  React.useEffect(() => {
    setCurrentProduct(data);
  }, [data]);

  const { mutate, isLoading } = useMutation(SkuAction.delete, {
    onSuccess: () => {
      toast.success("Đã chuyển vào thùng rác");
      router.replace(router.asPath);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleDelete = (id: string | number) => {
    swal({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Khi xóa, đối tượng sẽ không thể khôi phục",
      icon: "warning",
      buttons: ["Hủy", "Xóa"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate(id);
      }
    });
  };

  const { user } = useContext(AuthContext);

  const handleSearch = (e: any) => {
    e.preventDefault();

    setCurrentProduct(
      currentProduct.filter(
        (item) =>
          item.product.name.toLowerCase().indexOf(search.toLowerCase()) != -1 ||
          item.sku.toLowerCase().indexOf(search.toLowerCase()) != -1
      )
    );
  };

  return (
    <>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
            Quản lý hàng hóa
          </h1>
        </div>
        <SearchAdmin
          handleSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder={"Tìm kiếm theo tên, mã sku..."}
        />
        <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px] overflow-y-scroll shadow-master">
          <div className="overflow-x-auto relative">
            <table className="table-fixed w-full text-sm text-left  text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 sticky uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-2 md:py-3 px-3 md:px-6">
                    Hình ảnh
                  </th>
                  <th scope="col" className="py-2 md:py-3 px-3 md:px-6">
                    Tên sản phẩm
                  </th>
                  <th scope="col" className="py-2 md:py-3 px-3 md:px-6">
                    Loại
                  </th>
                  <th scope="col" className="py-2 md:py-3 px-3 md:px-6">
                    Giá
                  </th>
                  <th scope="col" className="py-2 md:py-3 px-3 md:px-6">
                    % Giảm
                  </th>
                  <th scope="col" className="py-2 md:py-3 px-3 md:px-6">
                    SKU
                  </th>
                  {(user?.detailActions.includes("product:update") ||
                    user?.detailActions.includes("product:delete")) && (
                    <th scope="col" className="py-3 px-6">
                      Hành động
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentProduct?.map((item) => {
                  const groupByAttribute: any = item.skuvalues.reduce(
                    (group: any, product) => {
                      const { attributeId } = product;
                      group[attributeId] = group[attributeId] ?? [];
                      group[attributeId].push(product);
                      return group;
                    },
                    {}
                  );

                  let types = "";
                  for (const key in groupByAttribute) {
                    types += `${groupByAttribute[key][0].attribute.name}: `;
                    groupByAttribute[key].forEach((item: any) => {
                      types += `${item.detailattribute.name} `;
                    });
                    types += " ";
                  }

                  return (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-2 md:py-4 px-3 md:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <LazyLoadImage
                          src={getImageServer(item.image)}
                          alt="123"
                          width={50}
                          height={50}
                        />
                      </th>
                      <td className="py-2 md:py-4 px-3 md:px-6">
                        {item.product.name}
                      </td>
                      <td className="py-2 md:py-4 px-3 md:px-6">
                        {types.trim().replace("  ", " , ")}
                      </td>
                      <td className="py-2 md:py-4 px-3 md:px-6">
                        {formatPrices(item.price)}
                      </td>
                      <td className="py-2 md:py-4 px-3 md:px-6">
                        {item.discount}%
                      </td>
                      <td className="py-2 md:py-4 px-3 md:px-6">{item.sku}</td>
                      {(user?.detailActions.includes("product:update") ||
                        user?.detailActions.includes("product:delete")) && (
                        <td className="py-2 md:py-4 px-3 md:px-6">
                          <div className="flex">
                            {user?.detailActions.includes("product:update") && (
                              <div
                                onClick={() => {
                                  setCurrent(item);
                                  setOpenModalUpdate(true);
                                }}
                                className="bg-primary flex items-center justify-center text-white p-1 rounded-md hover:bg-primaryHover cursor-pointer"
                              >
                                <CiEdit fontSize={24} />
                              </div>
                            )}
                            {user?.detailActions.includes("product:delete") && (
                              <div
                                onClick={() => handleDelete(item.id)}
                                className="ml-2 bg-red-500 flex items-center justify-center text-white p-1 rounded-md hover:bg-red-700 cursor-pointer"
                              >
                                <RiDeleteBin6Line fontSize={24} />
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalUpdateSku
        current={current}
        handleClose={() => setOpenModalUpdate(false)}
        open={openModalUpdate}
      />
    </>
  );
};

export default SkuAdmin;
