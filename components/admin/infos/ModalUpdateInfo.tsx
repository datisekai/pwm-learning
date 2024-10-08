import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import InfoAction from "../../../actions/Info.action";
import { InfoModel } from "../../../models/Info.model";
import Select from "../../customs/Select";
import TextField from "../../customs/TextField";
import { getImageServer, uploadImg } from "../../../utils";
import TextArea from "../../customs/TextArea";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FcAddImage } from "react-icons/fc";
import { useTheme } from "next-themes";
interface ModalUpdateInfoProps {
  open: boolean;
  handleClose: () => void;
  current: InfoModel;
}

const ModalUpdateInfo: React.FC<ModalUpdateInfoProps> = ({
  handleClose,
  open,
  current,
}) => {
  const [preview, setPreview] = React.useState("");
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
      title: "",
      content: "",
      code: "",
    },
  });

  const queryClient = useQueryClient();
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setValue("title", current?.title);
    setValue("content", current?.content);
    setValue("code", current?.code);
    current?.image && setPreview(getImageServer(current.image));
  }, [current]);

  const router = useRouter();
  const [file, setFile] = React.useState<any>();
  const { mutate, isLoading } = useMutation(InfoAction.update, {
    onSuccess: (data, variable) => {
      toast.success("Cập nhật thành công");
      handleClose();
      const dataInfoOld: InfoModel[] =
        queryClient.getQueryData(["infos"]) || [];

      queryClient.setQueryData(
        ["infos"],
        dataInfoOld.map((item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        })
      );
      reset();
      setFile(undefined);
      setPreview("");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleUpdate = async (data: any) => {
    let image = "";
    if (file) {
      image = await uploadImg(file);
    } else if (preview) {
      image = preview.split("images/")[1];
    }
    mutate({ ...data, id: current?.id, image });
  };

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div
        className={`${theme}-text w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] `}
      >
        <h2 className="font-bold">Cập nhật giới thiệu</h2>
        <div className="mt-4 space-y-2">
          <div className="space-y-2">
            <label>Code</label>
            <TextField
              control={control}
              error={errors}
              name="code"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
              }}
            />
          </div>
          <div className="space-y-2">
            <label>Tiêu đề</label>
            <TextField
              control={control}
              error={errors}
              name="title"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
              }}
            />
          </div>
          <div className="space-y-2">
            <label>Nội dung</label>
            <TextArea
              control={control}
              error={errors}
              name="content"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
              }}
            />
          </div>
          <div className="space-y-2">
            <label>Hình ảnh</label>
            <div className="">
              <input
                type="file"
                onChange={(e) => {
                  const files = e.target && e.target.files && e.target.files[0];
                  setFile(files);
                  files && setPreview(URL.createObjectURL(files));
                }}
                className="hidden"
                accept="image/*"
                id="mainImage"
              />
              <label htmlFor="mainImage">
                {preview ? (
                  <LazyLoadImage alt="" width={60} height="60" src={preview} />
                ) : (
                  <FcAddImage fontSize={40} />
                )}
              </label>
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

export default ModalUpdateInfo;
