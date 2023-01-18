import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import swal from "sweetalert";
import BlogAction from "../../../actions/Blog.action";
import { BlogModel } from "../../../models/Blog.model";
import { getImageServer } from "../../../utils";
import { AuthContext } from "../../context";

interface BlogAdminProps {
  data: BlogModel[];
}

const BlogAdmin: React.FC<BlogAdminProps> = ({ data }) => {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const { mutate, isLoading } = useMutation(BlogAction.delete, {
    onSuccess: () => {
      toast.success("Đã chuyển vào thùng rác");
      router.replace(router.asPath);
    },
    onError: (err) => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      console.log(err);
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

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
          Quản lý blog
        </h1>
        {user?.detailActions.includes("blog:add") && (
          <Link href={"/admin/blog/add"}>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
              Thêm blog
            </button>
          </Link>
        )}
      </div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className="mt-10 bg-white rounded-3xl p-4"
      >
        <div className="overflow-x-auto relative">
          <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Hình ảnh
                </th>
                <th scope="col" className="py-3 px-6">
                  Slug
                </th>
                <th scope="col" className="py-3 px-6">
                  Tiêu đề
                </th>
                <th scope="col" className="py-3 px-6">
                  Danh mục
                </th>
                <th scope="col" className="py-3 px-6">
                  Mô tả
                </th>
                <th scope="col" className="py-3 px-6">
                  Lượt xem
                </th>
                <th scope="col" className="py-3 px-6">
                  Người đăng
                </th>
                <th scope="col" className="py-3 px-6">
                  Ngày cập nhật
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
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
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
                  <td className="py-4 px-6">{item.slug}</td>
                  <td className="py-4 px-6">{item.name}</td>
                  <td className="py-4 px-6">{item?.categories_blog?.name}</td>
                  <td className="py-4 px-6">
                    {item.description.length < 60
                      ? item.description
                      : item.description.slice(0, 60) + "..."}
                  </td>
                  <td className="py-4 px-6">{item.view.count}</td>
                  <td className="py-4 px-6">{item?.user?.email}</td>
                  <td className="py-4 px-6">
                    {" "}
                    {dayjs(item.updatedAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <Link
                        href={`/blog/${item?.categories_blog?.slug}/${item.slug}`}
                      >
                        <div className="bg-slate-400 flex items-center justify-center text-white p-1 rounded-md hover:bg-slate-600 cursor-pointer">
                          <AiFillEye fontSize={24} />
                        </div>
                      </Link>
                      {user?.detailActions.includes("blog:update") && (
                        <Link href={`/admin/blog/update?id=${item.id}`}>
                          <div className="bg-primary flex items-center justify-center text-white p-1 rounded-md hover:bg-primaryHover cursor-pointer">
                            <CiEdit fontSize={24} />
                          </div>
                        </Link>
                      )}
                      {user?.detailActions.includes("blog:delete") && (
                        <div
                          onClick={() => handleDelete(item.id)}
                          className=" bg-red-500 flex items-center justify-center text-white p-1 rounded-md hover:bg-red-700 cursor-pointer"
                        >
                          <RiDeleteBin6Line fontSize={24} />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
