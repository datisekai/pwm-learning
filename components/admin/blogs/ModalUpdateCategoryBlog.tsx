import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CiLight } from "react-icons/ci";
import CategoryAction from "../../../actions/Category.action";
import CategoryBlogAction from "../../../actions/CategoryBlog.action";
import SpeciesAction from "../../../actions/Species.action";
import { CategoryModel } from "../../../models/Category.model";
import { CategoryBlogModel } from "../../../models/CategoryBlog.model";
import { SpeciesModel } from "../../../models/Species.model";
import Select from "../../customs/Select";
import TextField from "../../customs/TextField";
import { useTheme } from "next-themes";

interface ModalUpdateCategoryBlogProps {
  open: boolean;
  handleClose: () => void;
  current: CategoryBlogModel;
}

const ModalUpdateCategoryBlog: React.FC<ModalUpdateCategoryBlogProps> = ({
  handleClose,
  open,
  current,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setValue("name", current?.name);
  }, [current]);

  const router = useRouter();

  const { mutate, isLoading } = useMutation(CategoryBlogAction.update, {
    onSuccess: (data, variable) => {
      toast.success("Cập nhật thành công");
      const dataCbOld: CategoryBlogModel[] =
        queryClient.getQueryData(["category-blog"]) || [];
      queryClient.setQueryData(
        ["category-blog"],
        dataCbOld.map((item) => {
          if (item.id === variable.id) {
            return { ...item, ...variable, updatedAt: Date.now() };
          }
          return item;
        })
      );

      handleClose();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleUpdate = (data: any) => {
    mutate({ ...data, id: current?.id });
  };

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div
        className={`${theme}-text w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[25%] translate-x-[-50%] left-[50%] `}
      >
        <h2 className="font-bold">Cập nhật danh mục</h2>
        <div className="mt-4 space-y-2">
          <div className="space-y-2">
            <label>Tên danh mục</label>
            <TextField
              control={control}
              error={errors}
              name="name"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
                minLength: {
                  value: 5,
                  message:
                    "Tên thể loại của bạn quá ngắn. Vui lòng nhập ít nhất 5 kí tự",
                },
                maxLength: {
                  value: 120,
                  message:
                    "Tên thể loại của bạn quá dài. Vui lòng nhập tối đa 120 kí tự",
                },
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            disabled={isLoading}
            onClick={handleClose}
            type="button"
            className="text-gray-500 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Đóng
          </button>
          <button
            disabled={isLoading}
            onClick={handleSubmit(handleUpdate)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateCategoryBlog;
