import dayjs from "dayjs";
import React, { FC, useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SpeciesModel } from "../../../models/Species.model";
import ModalAddSpecies from "./ModalAddSpecies";
import ModalUpdateSpecies from "./ModalUpdateSpecies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SpeciesAction from "../../../actions/Species.action";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { AuthContext } from "../../context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getImageServer } from "../../../utils";
import LoadingSpinner from "../../LoadingSpinner";

const SpeciesAdmin = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [current, setCurrent] = useState<any>();

  const queryClient = useQueryClient();

  const router = useRouter();
  const { data: species, isLoading: isLoadingSpecies } = useQuery(
    ["species", router.asPath],
    () => SpeciesAction.getAll(0)
  );

  const { mutate, isLoading } = useMutation(SpeciesAction.delete, {
    onSuccess: (data, variable) => {
      toast.success("Đã chuyển vào thùng rác");
      queryClient.setQueryData(
        ["species", router.asPath],
        species?.filter((item) => item.id !== variable)
      );
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleDelete = (id: number) => {
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

  const { mutate: handleMenu, isLoading: loadingMenu } = useMutation(
    SpeciesAction.setMenu,
    {
      onSuccess: (data) => {
        toast.success(data.isMenu ? "Đã chuyển lên menu" : "Đã xóa khỏi menu");
        queryClient.setQueryData(
          ["species", router.asPath],
          species?.map((item) => {
            if (item?.id === data?.id) {
              return data;
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

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="mt-5 grid">
        <div className="flex items-center justify-between">
          <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
            Quản lý chủng loại
          </h1>
          {user?.detailActions.includes("species:add") && (
            <button
              onClick={() => setOpenModalAdd(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
            >
              Thêm chủng loại
            </button>
          )}
        </div>
        <div className="mt-4 bg-white rounded-3xl p-4 max-h-[450px] overflow-scroll shadow-master">
          <div className="relative">
            {!isLoadingSpecies ? (
              <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Hình ảnh
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tên chủng loại
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Ngày tạo
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Ngày cập nhật
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Menu
                    </th>
                    {(user?.detailActions.includes("species:update") ||
                      user?.detailActions.includes("species:delete")) && (
                      <th scope="col" className="py-3 px-6">
                        Hành động
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {species?.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <LazyLoadImage
                            width={60}
                            height={60}
                            className="rounded-md"
                            src={getImageServer(item.thumbnail)}
                            alt=""
                          />
                        </th>
                        <td className="py-4 px-6 break-words max-w-[300px]">
                          {item.name}
                        </td>
                        <td className="py-4 px-6">
                          {dayjs(item.createdAt).format("DD/MM/YYYY")}
                        </td>
                        <td className="py-4 px-6">
                          {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                        </td>
                        <td className="py-4 px-4">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.isMenu}
                              onChange={() => handleMenu(item.id)}
                              className="sr-only peer"
                              disabled={loadingMenu}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                          </label>
                        </td>
                        {(user?.detailActions.includes("species:update") ||
                          user?.detailActions.includes("species:delete")) && (
                          <td className="py-4 px-6">
                            <div className="flex">
                              {user?.detailActions.includes(
                                "species:update"
                              ) && (
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
                              {user?.detailActions.includes(
                                "species:delete"
                              ) && (
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
            ) : (
              <div className="flex items-center justify-center">
                <LoadingSpinner isFullScreen={false} />
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalAddSpecies
        handleClose={() => setOpenModalAdd(false)}
        open={openModalAdd}
      />
      <ModalUpdateSpecies
        current={current}
        handleClose={() => setOpenModalUpdate(false)}
        open={openModalUpdate}
      />
    </>
  );
};

export default SpeciesAdmin;
