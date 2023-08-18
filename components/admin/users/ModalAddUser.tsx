import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import CategoryAction from "../../../actions/Category.action";
import UserAction from "../../../actions/User.action";
import { PermissionModel } from "../../../models/Permission.model";
import { SpeciesModel } from "../../../models/Species.model";
import { UserModel } from "../../../models/User.model";
import Select from "../../customs/Select";
import TextField from "../../customs/TextField";

interface ModalAddUserProps {
  open: boolean;
  handleClose: () => void;
  data: PermissionModel[];
}

const ModalAddUser: React.FC<ModalAddUserProps> = ({
  handleClose,
  open,
  data,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      permissionId: "",
      name: "",
      phone: "",
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(UserAction.add, {
    onSuccess: (data) => {
      const dataUserOld: UserModel[] =
        queryClient.getQueryData(["users"]) || [];
      queryClient.setQueryData(["users"], [data, ...dataUserOld]);

      toast.success("Thêm thành công");
      handleClose();

      reset();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleUpdate = (data: any) => {
    mutate(data);
  };

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div className="w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] ">
        <h2 className="font-bold">Thêm người dùng</h2>
        <div className="mt-4 space-y-2">
          <div className="space-y-2">
            <label>Email</label>
            <TextField
              control={control}
              error={errors}
              name="email"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Vui lòng không bỏ trống",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Định dạng email chưa đúng",
                },
              }}
            />
          </div>
          <div className="space-y-2">
            <label>Mật khẩu</label>
            <TextField
              control={control}
              error={errors}
              name="password"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Vui lòng không bỏ trống",
              }}
            />
          </div>

          <div className="space-y-2">
            <label>Loại quyền</label>
            <Select
              control={control}
              data={data?.map((item: any) => ({
                text: item.name,
                value: item.id,
              }))}
              rules={{ required: "Không được để trống ô" }}
              error={errors}
              name="permissionId"
              className={"css-field"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label>Tên</label>
          <TextField
            control={control}
            error={errors}
            name="name"
            className={"css-field"}
            placeholder="Nhập vào"
          />
        </div>

        <div className="space-y-2">
          <label>Số điện thoại</label>
          <TextField
            control={control}
            error={errors}
            name="phone"
            className={"css-field"}
            placeholder="Nhập vào"
            rules={{
              pattern: {
                value:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                message: "Định dạng SDT chưa đúng",
              },
            }}
          />
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

export default ModalAddUser;
