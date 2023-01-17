import React, { useState, useEffect, useMemo } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FcAddImage } from "react-icons/fc";
import TextField from "../../components/customs/TextField";
import { useForm } from "react-hook-form";
import  HomeAdmin from "./index";
const UIAdmin = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      description: "",
    },
  });
  const [thumbnail, setThumbnail] = useState<any>();
  const [preview, setPreview] = useState("");

  const name = watch("name");
  return (
    <AdminLayout>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-white bg-primary px-4 py-2 inline rounded-lg">
            Giao diện
          </h1>
        </div>
        <div
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className="mt-10 bg-white rounded-3xl p-4"
        >
          <div className="overflow-x-auto relative">
            <div className="mt-5">
              <div className="flex items-center mt-2 ">
                <span className="w-[150px]">Màu sắc</span>
                <div className="flex-1 ml-4 ">
                  <div className=" flex items-center border rounded-md">
                    <TextField
                      control={control}
                      error={errors}
                      showError={false}
                      name="name"
                      placeholder="Nhập vào mã màu hexa"
                      className="w-full px-4 py-1 rounded-md outline-none"
                    />
                  </div>
                  <p className="py-1 text-primary text-sm">
                    {errors["name"] && errors["name"].message}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <span className="w-[150px]">Chọn background</span>
                <div className="ml-4 ">
                  <input
                    type="file"
                    value={thumbnail?.preview || ""}
                    onChange={(e) => {
                      const file: any = e.target.files
                        ? e.target.files[0]
                        : null;
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                        setThumbnail(file);
                      }
                    }}
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
              <div className="flex items-center mt-5 ">
                <span className="w-[150px]">Demo</span>
              </div>
              <div className="items-center mt-5 w-full h-auto border-solid border-2 border-black-500 pointer-events-none">
                      {/* <HomeAdmin/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UIAdmin;
