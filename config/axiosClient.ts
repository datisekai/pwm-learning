import axios, { AxiosResponse } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config: any) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error?.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
        deleteCookie("detailActions");
        deleteCookie("token");
      }
    }
    return Promise.reject(error?.response?.data);
  }
);

export default axiosClient;
