import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import SpeciesAction from "../../../actions/Species.action";
import { SpeciesModel } from "../../../models/Species.model";
import TextField from "../../customs/TextField";
import { v4 as uuidv4 } from "uuid";
import AttributeAction from "../../../actions/Attribute.action";
import { AttributeModel } from "../../../models/Attribute.model";

interface ModalAddAttributeProps {
  open: boolean;
  handleClose: () => void;
}

const ModalAddAttribute: React.FC<ModalAddAttributeProps> = ({
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
    },
  });

  const queryClient = useQueryClient();

  const router = useRouter();

  const [details, setDetails] = useState([
    {
      id: uuidv4(),
      value: "",
    },
  ]);

  const { mutate, isLoading } = useMutation(AttributeAction.add, {
    onSuccess: (data) => {
      const dataAttributeOld: AttributeModel[] =
        queryClient.getQueryData(["attributes"]) || [];
      queryClient.setQueryData(["attributes"], [data, ...dataAttributeOld]);
      toast.success("Thêm thành công");
      handleClose();
      reset();
      setDetails([
        {
          id: uuidv4(),
          value: "",
        },
      ]);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleUpdate = async (data: any) => {
    if (details[0].value.trim().length <= 0) {
      toast.error("Vui lòng nhập chi tiết");
      return;
    }

    if (details.some((item) => item.value.trim().length === 0)) {
      toast.error("Chi tiết không được bỏ trống");
      return;
    }

    mutate({ ...data, details: details.map((item) => item.value) });
  };

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div className="w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] ">
        <h2 className="font-bold">Thêm phân loại</h2>
        <div className="mt-4 space-y-2">
          <div className="space-y-2">
            <label>Tên phân loại</label>
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
            <div className="flex items-center justify-between space-x-1">
              <label>Chi tiết</label>

              <div
                onClick={() =>
                  setDetails([
                    ...details,
                    {
                      id: uuidv4(),
                      value: "",
                    },
                  ])
                }
                className="p-1 cursor-pointer"
              >
                <AiOutlinePlus className="text-[20px] " />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {details?.map((item, index) => (
                <div key={item.id} className="flex items-center">
                  <input
                    type="text"
                    className="css-field"
                    value={item.value}
                    placeholder="Nhập vào"
                    onChange={(e) =>
                      setDetails(
                        details.map((item1) => {
                          return item.id === item1.id
                            ? { ...item1, value: e.target.value }
                            : item1;
                        })
                      )
                    }
                  />
                  <div
                    onClick={() =>
                      details.length > 1 &&
                      setDetails(
                        details.filter((item1) => item1.id !== item.id)
                      )
                    }
                    className="p-1 cursor-pointer"
                  >
                    <AiOutlineDelete className="text-[20px] " />
                  </div>
                </div>
              ))}
            </div>
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

export default ModalAddAttribute;
