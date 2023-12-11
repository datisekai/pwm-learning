import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import OrderAction from "../../../actions/Order.action";
import { OrderModel } from "../../../models/Order.model";
import { UserModel } from "../../../models/User.model";
import Select from "../../customs/Select";
import dataStatus from "../../data/status";

interface ModalUpdateOrderProps {
  open: boolean;
  handleClose: () => void;
  current: OrderModel;
  users: UserModel[];
}

const ModalUpdateOrder: React.FC<ModalUpdateOrderProps> = ({
  handleClose,
  open,
  current,
}) => {
  const [file, setFile] = React.useState<any>();

  const [preview, setPreview] = React.useState("");

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      status: 1,
    },
  });

  useEffect(() => {
    if (current) {
      setValue("status", current.status);
    }
  }, [current]);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(OrderAction.update, {
    onSuccess: (data, variables) => {
      const dataOrderOld: OrderModel[] =
        queryClient.getQueryData(["orders", router.asPath]) || [];
      toast.success("Cập nhật thành công");
      handleClose();
      queryClient.setQueryData(
        ["orders", router.asPath],
        dataOrderOld.map((item) => {
          if (item.id === variables.id) {
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
  });

  const handleUpdate = (data: any) => {
    mutate({
      ...data,
      id: current?.id,
      customerId: data.customerId ? data.customerId : undefined,
    });
  };

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div className="w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] ">
        <h2 className="font-bold">Cập nhật đơn hàng</h2>
        <div className="mt-4 space-y-2">
          <div className="font-bold">Đơn hàng #{current?.id}</div>
          <div className="space-y-2">
            <label>Tình trạng</label>
            <Select
              control={control}
              data={dataStatus?.map((item) => ({
                text: `${item.value} - ${item.text}`,
                value: item.value,
              }))}
              error={errors}
              name="status"
              className={"css-field"}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleClose}
            type="button"
            className="text-gray-500 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Đóng
          </button>
          <button
            onClick={handleSubmit(handleUpdate)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateOrder;
