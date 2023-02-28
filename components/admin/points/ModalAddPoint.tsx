import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PointAction from "../../../actions/Point.action";
import { PointModel } from "../../../models/Point.model";
import TextField from "../../customs/TextField";

interface ModalAddPointProps {
  open: boolean;
  handleClose: () => void;
}

const ModalAddPoint: React.FC<ModalAddPointProps> = ({ handleClose, open }) => {
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
      minprice: 0,
      maxprice: 0,
      point: 0
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(PointAction.add, {
    onSuccess: (data, variable) => {
      toast.success("Thêm thành công");
      handleClose();
      const dataPointOld: PointModel[] =
        queryClient.getQueryData(["points"]) || [];
      queryClient.setQueryData(["points"], [data, ...dataPointOld]);
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
        <h2 className="font-bold">Thêm điểm</h2>
        <div className="mt-4 space-y-2">
          <div className="space-y-2">
            <label>Nhập khoảng giá</label>
            <div>
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
              <div className="mx-6">-</div>
              <TextField
                control={control}
                error={errors}
                name="note"
                className={"css-field"}
                placeholder="Nhập vào"
                rules={{
                  required: "Không được để trống ô",
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label>Nhập điểm</label>
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

export default ModalAddPoint;
