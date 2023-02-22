import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PermissionAction from "../../../actions/Permission.action";
import { PermissionModel } from "../../../models/Permission.model";
import TextField from "../../customs/TextField";

interface ModalAddPermissionProps {
  open: boolean;
  handleClose: () => void;
}

const ModalAddPermission: React.FC<ModalAddPermissionProps> = ({
  handleClose,
  open,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      note: "",
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(PermissionAction.add, {
    onSuccess: (data, variable) => {
      toast.success("Thêm thành công");
      handleClose();
      const dataPermissionOld: PermissionModel[] =
        queryClient.getQueryData(["permissions"]) || [];
      queryClient.setQueryData(["permissions"], [data, ...dataPermissionOld]);
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
        <h2 className="font-bold">Thêm quyền</h2>
        <div className="mt-4 space-y-2">
          <div className="space-y-2">
            <label>Tên quyền</label>
            <TextField
              control={control}
              error={errors}
              name="name"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
              }}
            />
          </div>
          <div className="space-y-2">
            <label>Ghi chú</label>
            <TextField
              control={control}
              error={errors}
              name="note"
              className={"css-field"}
              placeholder="Nhập vào"
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

export default ModalAddPermission;
