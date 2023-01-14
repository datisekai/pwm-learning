import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FcAddImage } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductAction from "../../../actions/Product.action";
import { CategoryModel } from "../../../models/Category.model";
import { ProductModel } from "../../../models/Product.model";
import { getImageServer, uploadImg } from "../../../utils";
import Select from "../../customs/Select";
import TextArea from "../../customs/TextArea";
import TextField from "../../customs/TextField";

interface ModalUpdateProductProps {
  open: boolean;
  handleClose: () => void;
  current: ProductModel;
  categories: CategoryModel[];
}

const ModalUpdateProduct: React.FC<ModalUpdateProductProps> = ({
  handleClose,
  open,
  current,
  categories,
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
      name: "",
      categoryId: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (current) {
      setValue("name", current.name);
      setValue("categoryId", current.categoryId);
      setValue("description", current.description);
      setPreview(getImageServer(current.thumbnail));
    }
  }, [current]);

  const router = useRouter();

  const { mutate, isLoading } = useMutation(ProductAction.update, {
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
    if (file) {
      image = await uploadImg(file);
    }else{
      image = preview.split('images/')[1]
    }


    mutate({ ...data, id: current.id, thumbnail: image
  });
  };

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div className="w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[25%] translate-x-[-50%] left-[50%] ">
        <h2 className="font-bold">Cập nhật sản phẩm</h2>
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <span>Hình ảnh</span>
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
          <div className="space-y-2">
            <label>Tên sản phẩm</label>
            <TextField
              control={control}
              error={errors}
              name="name"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
                minLength: {
                  value: 10,
                  message:
                    "Tên sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 10 kí tự",
                },
                maxLength: {
                  value: 120,
                  message:
                    "Tên sản phẩm của bạn quá dài. Vui lòng nhập tối đa 120 kí tự",
                },
              }}
            />
          </div>
          <div className="space-y-2">
            <label>Thể loại</label>
            <Select
              control={control}
              data={categories?.map((item) => ({
                text: item.name,
                value: item.id,
              }))}
              error={errors}
              name="categoryId"
              className={"css-field"}
            />
          </div>
          <div className="space-y-2">
            <label>Mô tả sản phẩm</label>
            <TextArea
              control={control}
              error={errors}
              name="description"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
                minLength: {
                  value: 100,
                  message:
                    "Tên sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 100 kí tự",
                },
                maxLength: {
                  value: 3000,
                  message:
                    "Tên sản phẩm của bạn quá dài. Vui lòng nhập tối đa 3000 kí tự",
                },
              }}
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

export default ModalUpdateProduct;
