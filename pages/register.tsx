import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UserAction from "../actions/User.action";
import TextField from "../components/customs/TextField";
import { toast } from "react-hot-toast";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { UserModel } from "../models/User.model";
import Meta from "../components/Meta";
import { after } from "node:test";
const Register = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      permissionId: "10",
      name: "",
      phone: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(UserAction.register, {
    onSuccess: (data) => {
      const dataUserOld: UserModel[] =
        queryClient.getQueryData(["users"]) || [];
      queryClient.setQueryData(["users"], [data.UserModel, ...dataUserOld]);
      toast.success("Đăng ký thành công");
      setCookie("token", data.token);
      setCookie("detailActions", data?.detailActions);
      if (data.detailActions.length > 0) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    },
    onError: (err: any) => {
      err && err?.message && toast.error(err.message);
    },
  });
  const handleRegister = async (data: any) => {
    mutate(data);
  };
  return (
    <>
      <Meta
        description="Đăng ký"
        title="Đăng ký | PWM"
        image="/images/logo.jpg"
      />
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <div
          className="w-[90%] md:w-[400px] rounded-lg px-6 py-4 bg-white"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <div className="flex justify-center">
            <Link href={"/"}>
              <LazyLoadImage
                src="/images/logo.jpg"
                className="w-[50%] rounded-tl-md rounded-br-md mx-auto"
              />
            </Link>
          </div>
          <h1 className="font-bold uppercase text-center mt-2">Đăng ký</h1>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="mt-4">
              <TextField
                control={control}
                error={errors}
                name="email"
                placeholder="Nhập email..."
                className="px-4 py-2 bg-[#f5f5f5] outline-none w-full border rounded-sm dark:text-black"
                rules={{
                  required: "Vui lòng không bỏ trống",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Định dạng email chưa đúng",
                  },
                }}
              />
              <TextField
                control={control}
                error={errors}
                name="password"
                type="password"
                placeholder="Nhập mật khẩu..."
                rules={{
                  required: "Vui lòng không bỏ trống",
                }}
                className="px-4 py-2 mt-1 bg-[#f5f5f5] dark:text-black outline-none w-full border rounded-sm"
              />
              <TextField
                control={control}
                error={errors}
                name="confirmPassword"
                type="password"
                placeholder="Xác nhận mật khẩu..."
                rules={{
                  required: "Vui lòng không bỏ trống",
                  validate: (value: string) => {
                    if (watch("password") != value) {
                      return "Mật khẩu không khớp";
                    }
                  },
                }}
                className="px-4 py-2 mt-1 bg-[#f5f5f5] dark:text-black outline-none w-full border rounded-sm"
              />
              <div className=" flex justify-end">
                <Link
                  href={"/login"}
                  className="text-primary mr-1 hover:text-primaryHover"
                >
                  Đăng nhập
                </Link>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="bg-primary mt-4 hover:bg-primaryHover transition-all text-white px-4 py-2 rounded-sm w-full"
              >
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
