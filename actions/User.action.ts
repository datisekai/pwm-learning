import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import axiosClient from "../config/axiosClient";

const UserAction = {
  login: async (data:{email: string, password: string}) => {
      const result = await axiosClient.post("/user/login", data);
      return result.data;
  },
  myInfo: async () => {
      const result = await axiosClient.get("/user/me");
      return result.data;
  },
};

export default UserAction;
