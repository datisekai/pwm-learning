import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const [file, setFile] = React.useState<File[]>();

  const [preview, setPreview] = React.useState<string[]>([]);

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
      slug: "",
    },
  });

  useEffect(() => {
    if (current) {
      setValue("name", current.name);
      setValue("slug", current.slug);
      setValue("categoryId", current.categoryId);
      setValue("description", current.description.replace(/<br\/>/g, "\n"));
      setPreview(
        current.productimages.map((item) => getImageServer(item.image))
      );
    }
  }, [current]);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(ProductAction.update, {
    onSuccess: (data, variables) => {
      const dataProductOld: ProductModel[] =
        queryClient.getQueryData(["products", router.asPath]) || [];
      toast.success("Cập nhật thành công");
      handleClose();
      queryClient.setQueryData(
        ["products", router.asPath],
        dataProductOld.map((item) => {
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

  const handleUpdate = async (data: any) => {
    const sending: any = {
      ...data,
      id: current.id,
      description: data.description.replace(/\n/g, "<br/>"),
    };
    if (file && file.length > 0) {
      sending.thumbnails = await Promise.all(
        Array.from(file).map((item) => uploadImg(item))
      );

      sending.thumbnail = sending.thumbnails[0];
    }

    mutate(sending);
  };

  return (
    <div className={`${!open && "hidden"} `}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-[60]"
        onClick={handleClose}
      ></div>
      <div className="w-[90%] md:w-[500px] p-4 rounded-lg bg-white fixed z-[70] top-[50%] translate-y-[-50%] translate-x-[-50%] left-[50%] ">
        <h2 className="font-bold">Cập nhật sản phẩm</h2>
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <span>Hình ảnh</span>
            <div className="">
              <input
                type="file"
                multiple={true}
                onChange={(e) => {
                  const files: any =
                    e.target && e.target.files && e.target.files;
                  if (files) {
                    const currentPreviews: any = [];
                    for (let i = 0; i < files.length; i++) {
                      currentPreviews.push(URL.createObjectURL(files[i]));
                    }
                    setPreview(currentPreviews);
                    setFile(files);
                  }
                }}
                className="hidden"
                accept="image/*"
                id="mainImage"
              />
              <label htmlFor="mainImage">
                {preview && preview.length > 0 ? (
                  <div className="flex flex-wrap space-x-2 space-y-1">
                    {preview.map((item, index) => (
                      <div key={index}>
                        <LazyLoadImage
                          alt=""
                          width={60}
                          height="60"
                          src={item}
                        />
                      </div>
                    ))}
                  </div>
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
              }}
            />
          </div>
          <div className="space-y-2">
            <label>Slug sản phẩm</label>
            <TextField
              control={control}
              error={errors}
              name="slug"
              className={"css-field"}
              placeholder="Nhập vào"
              rules={{
                required: "Không được để trống ô",
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
