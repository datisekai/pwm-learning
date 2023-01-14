import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TextField from "../../components/customs/TextField";

const LoginAdmin = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: any) => {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div
        className="w-[90%] md:w-[400px] rounded-lg px-6 py-4 bg-white"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <div className="flex justify-center">
          <Link href={"/"}>
            <LazyLoadImage src="/images/logo.png" />
          </Link>
        </div>
        <h1 className="font-bold uppercase text-center mt-2">Đăng nhập</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mt-4">
            <TextField
              control={control}
              error={errors}
              name="email"
              placeholder="Nhập email..."
              className="px-4 py-2 bg-[#f5f5f5] outline-none w-full border rounded-sm"
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
              placeholder="Nhập mật khẩu..."
              rules={{
                required: "Vui lòng không bỏ trống",
              }}
              className="px-4 py-2 mt-1 bg-[#f5f5f5] outline-none w-full border rounded-sm"
            />
            <button
              type="submit"
              className="bg-primary mt-4 hover:bg-primaryHover transition-all text-white px-4 py-2 rounded-sm w-full"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
