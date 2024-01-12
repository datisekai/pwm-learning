import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetStaticPaths,
  GetStaticProps,
  GetServerSideProps,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { v4 as uuidv4 } from "uuid";
import AttributeAction from "../../../actions/Attribute.action";
import CategoryAction from "../../../actions/Category.action";
import ProductAction from "../../../actions/Product.action";
import Select from "../../../components/customs/Select";
import TextArea from "../../../components/customs/TextArea";
import TextField from "../../../components/customs/TextField";
import AdminLayout from "../../../components/layouts/AdminLayout";
import Meta from "../../../components/Meta";
import TranslationArea from "../../../components/TranslationArea";
import { AttributeAdd, Detailattribute } from "../../../models/Attribute.model";
import slugify from "slugify";
import {
  getCombinationsByAttributeId,
  getImageServer,
  isNumber,
  uploadImg,
} from "../../../utils";
import SkuAdmin from "../../../components/admin/products/SkuAdmin";
import { ProductDetailModel } from "../../../models/ProductDetail.model";
import SkuAction from "../../../actions/Sku.action";
import { ProductModel } from "../../../models/Product.model";

export interface Sku {
  price: string;
  discount: string;
  file: File | undefined;
  preview: string;
  skuPhanLoai: string;
  detailAttributes: Attribute[];
  priceDisplay: string;
}

interface Attribute {
  id: number;
  name: string;
  attributeId: number;
}
interface UpdateProductProps {
  detail: ProductDetailModel;
}

const UpdateProduct: NextPage<UpdateProductProps> = ({ detail }) => {
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
      slug: "",
      category: "",
      description: "",
    },
  });

  const { data: categories } = useQuery(["categories"], CategoryAction.getAll);
  const { data: products } = useQuery(["products"], ProductAction.getAll);

  const router = useRouter();

  const [thumbnails, setThumbnails] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(ProductAction.update, {
    onSuccess: (data, variables) => {
      const dataProductOld: ProductModel[] =
        queryClient.getQueryData(["products", router.asPath]) || [];
      toast.success("Cập nhật thành công");
      queryClient.setQueryData(
        ["products", router.asPath],
        dataProductOld.map((item) => {
          if (item.id === variables.id) {
            return data;
          }
          return item;
        })
      );
      router.push("/admin/product");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    },
  });

  const handleUpdate = async (data: any) => {
    if (data.slug !== detail.slug) {
      let isExistSlug = false;
      products?.map((item) => {
        if (item.slug == data.slug) {
          isExistSlug = true;
        }
      });
      if (isExistSlug) {
        toast.error("Slug đã được sử dụng");
        return;
      }
    }

    const sending: any = {
      ...data,
      id: detail.id,
      description: data.description.replace(/\n/g, "<br/>"),
    };
    if (detail.categoryId !== +data.category) {
      sending.categoryId = +data.category;
      sending.category = categories?.find((item) => {
        return item.id === +data.category;
      });
    }
    if (thumbnails && thumbnails.length > 0) {
      sending.thumbnails = await Promise.all(
        Array.from(thumbnails).map((item) => uploadImg(item))
      );

      sending.thumbnail = sending.thumbnails[0];
    }
    console.log(thumbnails);

    mutate(sending);
  };
  const handleCreateSlug = () => {
    setValue(
      "slug",
      slugify(getValues("name"), {
        replacement: "-",
        remove: undefined,
        lower: false,
        strict: false,
        locale: "vi",
        trim: true,
      })
    );
  };
  useEffect(() => {
    if (detail) {
      setValue("name", detail.name);
      setValue("slug", detail.slug);
      setValue("category", detail.categoryId.toString());
      setValue("description", detail.description.replace(/<br\/>/g, "\n"));
      setPreview(
        detail.productimages.map((item) => getImageServer(item.image))
      );
    }
  }, [detail]);
  return (
    <>
      <Meta
        image="/images/logo.jpg"
        title="Thêm sản phẩm | Admin"
        description=""
      />
      <AdminLayout>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
              Cập nhật sản phẩm
            </h1>
          </div>
          <div className="flex flex-col mt-10">
            <div
              className="p-4 rounded-3xl flex flex-col md:flex-row w-full"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div className="w-full">
                <h2 className="font-bold">Thông tin cơ bản</h2>
                <div className="mt-5">
                  <div className="flex items-center">
                    <span className="w-[150px]">Hình ảnh chính</span>
                    <div className="ml-4 ">
                      <input
                        type="file"
                        multiple={true}
                        onChange={(e) => {
                          const files: any = e.target.files
                            ? e.target.files
                            : null;
                          if (files) {
                            const currentPreviews: any = [];
                            for (let i = 0; i < files.length; i++) {
                              currentPreviews.push(
                                URL.createObjectURL(files[i])
                              );
                            }
                            setPreview(currentPreviews);
                            setThumbnails(files);
                          }
                        }}
                        className="hidden"
                        name=""
                        id="mainImage"
                        accept="image/*"
                      />
                      <label htmlFor="mainImage" className="cursor-pointer ">
                        {preview && preview.length > 0 ? (
                          <div className="flex flex-wrap items-center space-x-2 space-y-1">
                            {preview.map((item, index) => (
                              <div key={index}>
                                <LazyLoadImage
                                  src={item}
                                  className="w-[40px] h-[40px]"
                                  effect="blur"
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
                  <div className="flex items-center mt-2 ">
                    <span className="w-[150px]">Tên sản phẩm</span>
                    <div className="flex-1 ml-4 ">
                      <div className=" flex items-center border rounded-md">
                        <TextField
                          control={control}
                          error={errors}
                          showError={false}
                          rules={{
                            required: "Không được để trống ô",
                          }}
                          name="name"
                          placeholder="Nhập vào"
                          className="w-full px-4 py-1 rounded-md outline-none"
                        />
                        {/* <div className="border-l px-2 text-[#666]">
                          {name.length}/{maxLength}
                        </div> */}
                      </div>
                      <p className="py-1 text-primary text-sm">
                        {errors["name"] && errors["name"].message}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 ">
                    <span className="w-[150px]">Slug sản phẩm</span>
                    <div className="flex-1 ml-4 ">
                      <div className=" flex items-center border rounded-md">
                        <TextField
                          control={control}
                          error={errors}
                          showError={false}
                          rules={{
                            required: "Không được để trống ô",
                          }}
                          name="slug"
                          placeholder="Nhập vào"
                          className="w-full px-4 py-1 rounded-md outline-none"
                        />
                        <div
                          className="bg-primary border-l rounded-r-md px-2 py-1 cursor-pointer text-white"
                          onClick={handleCreateSlug}
                        >
                          Auto
                        </div>
                      </div>
                      <p className="py-1 text-primary text-sm">
                        {errors["slug"] && errors["slug"].message}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Thể loại</span>
                    <div className="ml-4 flex-1">
                      <Select
                        error={errors}
                        name="category"
                        rules={{
                          required: "Không được để trống ô",
                        }}
                        control={control}
                        className="px-4 h-[34px] outline-none border rounded-md w-full"
                        data={
                          categories?.map((item) => ({
                            value: item.id,
                            text: item.name,
                          })) || []
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="w-[150px]">Mô tả sản phẩm</span>
                    <div className="ml-4 flex-1">
                      <TextArea
                        control={control}
                        error={errors}
                        rules={{
                          required: "Không được để trống ô",
                        }}
                        name="description"
                        placeholder="Nhập vào"
                        className="w-full border px-4 py-1 rounded-md outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleSubmit(handleUpdate)}
                      className="text-white bg-primary  py-1 rounded-md w-[80px]"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <SkuAdmin productId={detail.id} />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default UpdateProduct;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const detailActions = JSON.parse(req.cookies["detailActions"] || "[]");
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }
  const data = await ProductAction.detail(slug);

  if (detailActions.includes("product:update")) {
    return {
      props: { detail: data },
    };
  }

  return {
    props: {},
    redirect: {
      destination: "/admin",
    },
  };
};
