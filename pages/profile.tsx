import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UserAction from "../actions/User.action";
import { AuthContext } from "../components/context";
import TextField from "../components/customs/TextField";
import MainLayout from "../components/layouts/MainLayout";
import Meta from "../components/Meta";
import { generateAvatar } from "../utils";
import { useTheme } from "next-themes";

const MyInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const { systemTheme, theme, setTheme } = useTheme();
  console.log(theme);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("email", user?.email);
      setValue("name", user?.name);
      setValue("phone", user?.phone);
    }
  }, [user]);

  const { mutate, isLoading } = useMutation(UserAction.updateMyInfo, {
    onSuccess: (data) => {
      setUser(data);
      toast.success("Cập nhật thành công");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const handleUpdate = (data: any) => {
    mutate(data);
  };

  return (
    <>
      <Meta
        description="Info | PWM"
        title="Thông tin cá nhân | PWM"
        image="/images/logo.jpg"
      />
      <MainLayout>
        <div className={`bg-gray-100 min-h-screen mx-auto ${theme}`}>
          <div className="max-w-[1200px] mx-auto pt-4 flex flex-col md:flex-row">
            <div className="w-full md:w-[20%] space-y-2 flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <LazyLoadImage
                  className="w-[50px] h-[50px] rounded-full"
                  src={generateAvatar(user && (user?.name || user?.email))}
                />
                <span>{user?.name || user?.email?.split("@")[0]}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span>Tích điểm:</span>
                <span className="text-primary">{user?.point || 0}</span>
              </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-md shadow">
              <div className={`border-b pb-2 ${theme}-text`}>
                <h1 className="text-lg md:text-xl">Hồ sơ của tôi</h1>
                <p className="text-sm">
                  Quản lý thông tin để bảo mật tài khoản
                </p>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="w-[120px] text-right md:w-[200px] text-gray-500">
                    Tên
                  </label>
                  <div className="w-[50%]">
                    <TextField
                      control={control}
                      error={errors}
                      placeholder="Nhập tên..."
                      name="name"
                      className={"css-field"}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="w-[120px] text-right md:w-[200px] text-gray-500">
                    Email
                  </label>
                  <span className={`${theme}-text`}>{user?.email}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="w-[120px] text-right md:w-[200px] text-gray-500">
                    Số điện thoại
                  </label>
                  <div className="w-[50%]">
                    <TextField
                      control={control}
                      error={errors}
                      placeholder="Nhập số điện thoại..."
                      name="phone"
                      className={"css-field"}
                    />
                  </div>
                </div>

                <div className="ml-[136px] md:ml-[216px]">
                  <button
                    onClick={handleSubmit(handleUpdate)}
                    disabled={isLoading}
                    className="px-4  rounded-md py-2 bg-primary text-white hover:bg-primaryHover"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default MyInfo;
