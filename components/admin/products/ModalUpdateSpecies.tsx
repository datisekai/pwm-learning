import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcAddImage } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CategoryAction from "../../../actions/Category.action";
import SpeciesAction from "../../../actions/Species.action";
import { CategoryModel } from "../../../models/Category.model";
import { SpeciesModel } from "../../../models/Species.model";
import { getImageServer, uploadImg } from "../../../utils";
import Select from "../../customs/Select";
import TextField from "../../customs/TextField";
import { useTheme } from "next-themes";

interface ModalUpdateSpeciesProps {
  open: boolean;
  handleClose: () => void;
  current: SpeciesModel;
}

const ModalUpdateSpecies: React.FC<ModalUpdateSpeciesProps> = ({
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

  const [thumbnail, setThumbnail] = React.useState<File>();
  const [preview, setPreview] = React.useState<string>("");

  const queryClient = useQueryClient();
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setValue("name", current?.name);
    if (current?.thumbnail) {
      setPreview(getImageServer(current.thumbnail));
    }
  }, [current]);

  const router = useRouter();

  const { mutate, isLoading } = useMutation(SpeciesAction.update, {
    onSuccess: (data) => {
      toast.success("Cập nhật thành công");
      const dataSpeciesOld: SpeciesModel[] =
        queryClient.getQueryData(["species", router.asPath]) || [];
      queryClient.setQueryData(
        ["species", router.asPath],
        dataSpeciesOld.map((item) => {
          if (item.id === data.id) {
            return data;
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

  const handleUpdate = async (data: any) => {
    let image = "";
    if (thumbnail) {
      image = await uploadImg(thumbnail);
    } else {
      image = preview.split("images/")[1];
    }

    mutate({ ...data, id: current?.id, thumbnail: image });
  };

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div
        className={`${theme}-text w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%]`}
      >
        <h2 className="font-bold">Cập nhật chủng loại</h2>
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
            <label>Tên chủng loại</label>
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

export default ModalUpdateSpecies;
