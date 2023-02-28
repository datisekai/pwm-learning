import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcAddImage } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CategoryAction from "../../../actions/Category.action";
import SkuAction from "../../../actions/Sku.action";
import SpeciesAction from "../../../actions/Species.action";
import { CategoryModel } from "../../../models/Category.model";
import { SkuModel } from "../../../models/Sku.model";
import { SpeciesModel } from "../../../models/Species.model";
import { getImageServer, uploadImg } from "../../../utils";
import Select from "../../customs/Select";
import TextField from "../../customs/TextField";

interface ModalUpdateSkuProps {
  open: boolean;
  handleClose: () => void;
  current: SkuModel;
}

const ModalUpdateSku: React.FC<ModalUpdateSkuProps> = ({
  handleClose,
  open,
  current,
}) => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState("");
  const queryClient = useQueryClient();

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      price: 0,
      discount: 0,
      sku: "",
    },
  });

  useEffect(() => {
    setValue("price", current?.price);
    setValue("discount", current?.discount);
    setValue("sku", current?.sku);
    setPreview(getImageServer(current?.image));
  }, [current]);

  const router = useRouter();

  const { mutate, isLoading } = useMutation(SkuAction.update, {
    onSuccess: (data) => {
      const dataSkuOld: SkuModel[] =
        queryClient.getQueryData(["skus", router.asPath]) || [];
      queryClient.setQueryData(
        ["skus", router.asPath],
        dataSkuOld.map((item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        })
      );
      toast.success("Cập nhật thành công");
      handleClose();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleUpdate = async (data: any) => {
    let image = preview;
    if (file) {
      image = getImageServer(await uploadImg(file));
    }
    mutate({ ...data, id: current?.id, image: image.split("images/")[1] });
  };

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div className="w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] ">
        <h2 className="font-bold">Cập nhật hàng hóa</h2>
        <div className="mt-4 space-y-2">
          <div className="space-y-2">
            <span className="w-[150px]">Hình ảnh</span>
            <div className="ml-4 ">
              <input
                type="file"
                onChange={(e) => {
                  const file: any = e.target.files ? e.target.files[0] : null;
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                    setFile(file);
                  }
                }}
                accept="image/*"
                className="hidden"
                name=""
                id="mainImage"
              />
              <label htmlFor="mainImage" className="cursor-pointer ">
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
          <div className="space-y-2">
            <label>SKU</label>
            <TextField
              control={control}
              error={errors}
              name="sku"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
              }}
            />
          </div>
          <div className="space-y-2">
            <label>Giá hàng hóa</label>
            <TextField
              control={control}
              error={errors}
              name="price"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  message: "Trường này phải là số",
                },
              }}
            />
          </div>
          <div className="space-y-2">
            <label>% giảm</label>
            <TextField
              control={control}
              error={errors}
              name="discount"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  message: "Trường này phải là số",
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

export default ModalUpdateSku;
