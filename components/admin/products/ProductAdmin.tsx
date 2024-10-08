import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AiFillPlusCircle } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import swal from "sweetalert";
import CategoryAction from "../../../actions/Category.action";
import PopularAction from "../../../actions/Popular.action";
import ProductAction from "../../../actions/Product.action";
import { CategoryModel } from "../../../models/Category.model";
import { ProductModel } from "../../../models/Product.model";
import { getImageServer } from "../../../utils";
import { AuthContext } from "../../context";
import LoadingSpinner from "../../LoadingSpinner";
import SearchAdmin from "../../SearchAdmin";
import ModalUpdateProduct from "./ModalUpdateProduct";
import { CgEditContrast } from "react-icons/cg";
import ModalUpdateProductAtt from "./ModalUpdateProductAtt";
import AttributeAction from "../../../actions/Attribute.action";

const ProductAdmin = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [current, setCurrent] = React.useState<any>();
  const [currentProduct, setCurrentProduct] = React.useState<ProductModel[]>(
    []
  );
  const [openUpdateAtt, setOpenUpdateAtt] = React.useState(false);

  const { data: attributes } = useQuery(["attributes"], AttributeAction.getAll);

  const [search, setSearch] = React.useState("");
  const router = useRouter();

  const { data: products, isLoading: isLoadingProduct } = useQuery(
    ["products", router.asPath],
    ProductAction.getAll
  );

  const { data: categories, isLoading: isLoadingCategory } = useQuery(
    ["categories"],
    CategoryAction.getAll
  );

  React.useEffect(() => {
    setCurrentProduct(products || []);
  }, [products]);

  const { user } = useContext(AuthContext);

  const { mutate, isLoading } = useMutation(ProductAction.delete, {
    onSuccess: (data, variables) => {
      toast.success("Đã chuyển vào thùng rác");
      queryClient.setQueryData(
        ["products", router.asPath],
        products?.filter((item) => item.id !== variables)
      );
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleDelete = (id: number | string) => {
    swal({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Khi xóa, đối tượng sẽ được chuyển vào thùng rác",
      icon: "warning",
      buttons: ["Hủy", "Xóa"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate(id);
      }
    });
  };

  const queryClient = useQueryClient();

  const { mutate: handlePopular, isLoading: loadingPopular } = useMutation(
    PopularAction.popular,
    {
      onSuccess: (data, variables) => {
        toast.success("Cập nhật sản phẩm nổi bật thành công");
        queryClient.setQueryData(
          ["products", router.asPath],
          products?.map((item) => {
            if (item.id === variables) {
              return { ...item, popular: data == 1 ? null : data };
            }
            return item;
          })
        );
      },
      onError: (err) => {
        console.log(err);
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
      },
    }
  );

  useEffect(() => {
    if (search.trim().length === 0) {
      setCurrentProduct(products || []);
    }
  }, [search]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (search.trim() != "") {
      setCurrentProduct(
        currentProduct.filter(
          (item) =>
            item.name.toLowerCase().indexOf(search.toLowerCase()) != -1 ||
            item.category.name.toLowerCase().indexOf(search.toLowerCase()) !=
              -1 ||
            item.user.email.toLowerCase().indexOf(search.toLowerCase()) != -1
        )
      );
    }
  };

  return (
    <>
      <div className="mt-5 grid">
        <div className="flex items-center justify-between">
          <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
            Quản lý sản phẩm
          </h1>
          {user?.detailActions.includes("product:add") && (
            <Link href={"/admin/product/add1"}>
              <div className="flex items-center px-2 py-2 rounded-lg bg-green-500 hover:bg-green-700">
                <AiFillPlusCircle fontSize={24} className="text-white" />
                <button className=" text-white ml-2">Thêm sản phẩm</button>
              </div>
            </Link>
          )}
        </div>
        <SearchAdmin
          handleSearch={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
          <div className="relative">
            {!isLoadingProduct || !isLoadingCategory ? (
              <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                      Nổi bật
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
                  {currentProduct?.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <LazyLoadImage
                          src={getImageServer(item.thumbnail)}
                          alt="123"
                          width={50}
                          height={50}
                        />
                      </th>
                      <td className="py-4 px-6 break-words max-w-[200px]">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 break-words max-w-[200px]">
                        {item.category.name}
                      </td>
                      <td className="py-4 px-6">{item.skus.length}</td>
                      <td className="py-4 px-6">
                        {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                      </td>
                      <td className="py-4 px-6 break-words max-w-[300px]">
                        {item.user.email}
                      </td>
                      <td className="py-4 px-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.popular !== null}
                            onChange={() => handlePopular(item.id)}
                            className="sr-only peer"
                            disabled={loadingPopular}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                        </label>
                      </td>
                      {(user?.detailActions.includes("product:update") ||
                        user?.detailActions.includes("product:delete")) && (
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            {user?.detailActions.includes("product:update") && (
                              <Link href={`/admin/product/${item.slug}`}>
                                <div
                                  // onClick={() => {
                                  //   setCurrent(item);
                                  //   setOpenModal(true);
                                  // }}
                                  className="bg-primary flex items-center justify-center text-white p-1 rounded-md hover:bg-primaryHover cursor-pointer"
                                >
                                  <CiEdit fontSize={24} />
                                </div>
                              </Link>
                            )}
                            {user?.detailActions.includes("product:update") && (
                              <div
                                onClick={() => {
                                  setCurrent(item);
                                  setOpenUpdateAtt(true);
                                }}
                                className=" bg-blue-600 flex items-center justify-center text-white p-1 rounded-md hover:bg-blue-700 cursor-pointer"
                              >
                                <CgEditContrast fontSize={24} />
                              </div>
                            )}
                            {user?.detailActions.includes("product:delete") && (
                              <div
                                onClick={() => handleDelete(item.id)}
                                className=" bg-red-500 flex items-center justify-center text-white p-1 rounded-md hover:bg-red-700 cursor-pointer"
                              >
                                <RiDeleteBin6Line fontSize={24} />
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center">
                <LoadingSpinner isFullScreen={false} />
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalUpdateProduct
        current={current}
        handleClose={() => setOpenModal(false)}
        open={openModal}
        categories={categories || []}
      />
      <ModalUpdateProductAtt
        current={current}
        handleClose={() => setOpenUpdateAtt(false)}
        open={openUpdateAtt}
        attributes={attributes}
      />
    </>
  );
};

export default ProductAdmin;
