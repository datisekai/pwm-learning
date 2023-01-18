import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import InfoAction from "../../../actions/Info.action";
import { InfoModel } from "../../../models/Info.model";
import Select from "../../customs/Select";
import TextArea from "../../customs/TextArea";
import TextField from "../../customs/TextField";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FcAddImage } from "react-icons/fc";
import { uploadImg } from "../../../utils";
interface ModalAddInfoProps {
  open: boolean;
  handleClose: () => void;
}

const ModalAddInfo: React.FC<ModalAddInfoProps> = ({ handleClose, open }) => {
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
    },
  });
  const [image, setThumbnail] = useState<any>();
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [file, setFile] = React.useState<any>();
  const { mutate, isLoading } = useMutation(InfoAction.add, {
    onSuccess: () => {
      toast.success("Thêm thành công");
      handleClose();
      router.replace(router.asPath);
      reset();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleAdd = async (data: any) => {
    const newInfo: any = {
      id: data.id,
      title: data.title,
      content: data.content,
      image: "",
    };

    if (!image) {
      toast.error("Vui lòng chọn ảnh chính");
      return;
    }

    newInfo.image = await uploadImg(image);

    if (!newInfo.image) {
      toast.error("Ảnh chính chưa hợp lệ, vui lòng chọn ảnh khác");
      return;
    }

    mutate(newInfo);
  };
  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div className="w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] ">
        <h2 className="font-bold">Thêm giới thiệu</h2>
        <div className="mt-4 space-y-2">
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
                minLength: {
                  value: 20,
                  message:
                    "Tiêu đề của bạn quá ngắn. Vui lòng nhập ít nhất 20 kí tự",
                },
                maxLength: {
                  value: 120,
                  message:
                    "Tiêu đề của bạn quá dài. Vui lòng nhập tối đa 120 kí tự",
                },
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
                minLength: {
                  value: 50,
                  message:
                    "Nội dung của bạn quá ngắn. Vui lòng nhập ít nhất 50 kí tự",
                },
                maxLength: {
                  value: 3000,
                  message:
                    "Tiêu đề của bạn quá dài. Vui lòng nhập tối đa 3000 kí tự",
                },
              }}
            />
          </div>
          <div className="space-y-2">
            <label>Hình ảnh</label>
            <div className="ml-4 ">
              <input
                type="file"
                value={image?.preview || ""}
                onChange={(e) => {
                  const file: any = e.target.files ? e.target.files[0] : null;
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                    setThumbnail(file);
                  }
                }}
                className="hidden"
                name=""
                id="image"
              />
              <label htmlFor="image" className="cursor-pointer ">
                {preview ? (
                  <LazyLoadImage
                    src={preview}
                    className="w-[40px] h-[40px]"
                    effect="blur"
                  />
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
            onClick={handleSubmit(handleAdd)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddInfo;
