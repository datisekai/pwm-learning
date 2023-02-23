import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../components/context";
import TextField from "../components/customs/TextField";
import MainLayout from "../components/layouts/MainLayout";
import Meta from "../components/Meta";
import { generateAvatar } from "../utils";

const MyInfo = () => {
  const { user } = useContext(AuthContext);

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
      gender: "male",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("email", user?.email);
    }
  }, [user]);

  return (
    <>
      <Meta
        description="Info | PWM"
        title="Thông tin cá nhân | PWM"
        image="/images/logo.jpg"
      />
      <MainLayout>
        <div className="  bg-gray-100 min-h-screen mx-auto">
          <div className="max-w-[1200px] mx-auto pt-4 flex flex-col md:flex-row">
            <div className="w-full md:w-[20%] space-y-2 flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <LazyLoadImage
                  className="w-[50px] h-[50px] rounded-full"
                  src={generateAvatar(user && user?.email)}
                />
                <span>{user?.email?.split("@")[0]}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span>Tích điểm:</span>
                <span className="text-primary">1200</span>
              </div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-md shadow">
              <div className="border-b pb-2">
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
                  <span>{user?.email}</span>
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
                <div className="flex items-center space-x-4">
                  <label className="w-[120px] text-right md:w-[200px] text-gray-500">
                    Giới tính
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="space-x-2 flex items-center">
                      <input
                        type="radio"
                        onChange={(e) =>
                          e.target.checked && setValue("gender", e.target.value)
                        }
                        name="gender"
                        value="male"
                        id="gender-male"
                      />
                      <label htmlFor="gender-male">Nam</label>
                    </div>
                    <div className="space-x-2 flex items-center">
                      <input
                        onChange={(e) =>
                          e.target.checked && setValue("gender", e.target.value)
                        }
                        type="radio"
                        name="gender"
                        value="female"
                        id="gender-female"
                      />
                      <label htmlFor="gender-female">Nữ</label>
                    </div>
                    <div className="space-x-2 flex items-center">
                      <input
                        onChange={(e) =>
                          e.target.checked && setValue("gender", e.target.value)
                        }
                        type="radio"
                        name="gender"
                        value="other"
                        id="gender-other"
                      />
                      <label htmlFor="gender-other">Khác</label>
                    </div>
                  </div>
                </div>
                <div className="ml-[136px] md:ml-[216px]">
                  <button className="px-4  rounded-md py-2 bg-primary text-white hover:bg-primaryHover">
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
