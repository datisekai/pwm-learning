import axiosClient from "../config/axiosClient";

export const formatPrices = (price: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const generateAvatar = (email: string) => {
  return `https://ui-avatars.com/api/?background=EA8143&color=fff&name=${email}`;
};

export const formatNumber = (value: number) => {
  return value.toLocaleString("en-IN", {
    maximumSignificantDigits: 3,
  });
};

export const getImageServer = (filename:string) => {
  return `${process.env.NEXT_PUBLIC_SERVER_URL}/images/${filename}`
}

export const uploadImg = async (files: any) => {
  const formData = new FormData();
  formData.append("pwm-file", files);

  try {
    const res = await axiosClient.post("/upload/image", formData);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};