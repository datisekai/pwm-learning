import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import axiosClient from "../config/axiosClient";

const UserAction = {
  login: async (email: string, password: string) => {
    try {
      const result = await axiosClient.post("/user/login", { email, password });
      return result.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  },
  myInfo: async () => {
    try {
      const result = await axiosClient.get("/user/me");
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default UserAction;
