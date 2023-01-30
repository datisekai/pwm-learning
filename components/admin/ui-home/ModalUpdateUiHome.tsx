import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcAddImage } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SliderAction from "../../../actions/Slider.action";
import SpeciesAction from "../../../actions/Species.action";
import UIAction from "../../../actions/UiHome.action";
import { SliderModel } from "../../../models/Slider.model";
import { UIModel } from "../../../models/Ui.model";
import { getImageServer, uploadImg } from "../../../utils";
import TextField from "../../customs/TextField";

interface ModalUpdateUiHomeProps {
  open: boolean;
  handleClose: () => void;
  current: UIModel;
}

const ModalUpdateUiHome: React.FC<ModalUpdateUiHomeProps> = ({
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
      code: "",
      note: "",
    },
  });

  const [thumbnail, setThumbnail] = React.useState<File>();
  const [preview, setPreview] = React.useState<string>("");

  useEffect(() => {
    setValue("code", current?.code);
    current?.note && setValue("note", current?.note);
    if (current?.image) {
      setPreview(getImageServer(current.image));
    }
  }, [current]);

  const router = useRouter();

  const { mutate, isLoading } = useMutation(UIAction.update, {
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      handleClose();
      router.replace(router.asPath);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleUpdate = async (data: any) => {
    let image = "";
    if (thumbnail) {
      image = await uploadImg(thumbnail);
    } else {
      image = preview.split("images/")[1];
    }

    mutate({ ...data, id: current?.id, image: image });
  };

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div className="w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] ">
        <h2 className="font-bold">Cập nhật UI</h2>
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <span>Hình ảnh</span>
            <div className="">
              <input
                type="file"
                onChange={(e) => {
                  const files = e.target && e.target.files && e.target.files[0];
                  setThumbnail(files || undefined);
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
          <div className="space-y-2">
            <label>Code</label>
            <TextField
              control={control}
              error={errors}
              name="code"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được bỏ trống",
              }}
            />
          </div>
          <div className="space-y-2">
            <label>Ghi chú</label>
            <TextField
              control={control}
              error={errors}
              name="note"
              className={"css-field"}
              placeholder="VD: slider đầu trang home"
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

export default ModalUpdateUiHome;
