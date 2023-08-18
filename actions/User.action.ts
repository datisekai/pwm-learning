import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import axiosClient from "../config/axiosClient";
import { UserModel } from "../models/User.model";

interface IUserAction {
  login: (data: {
    email: string;
    password: string;
  }) => Promise<{ token: string; detailActions: any[] }>;
  myInfo: () => Promise<any>;
  update: (data: any) => Promise<UserModel>;
  delete: (id: number | string) => Promise<any>;
  add: (data: any) => Promise<UserModel>;
  getAll: () => Promise<UserModel[]>;
  updateMyInfo: (data: any) => Promise<any>;
  register: (
    data: any
  ) => Promise<{ token: string; detailActions: any[]; UserModel: UserModel }>;
}

const UserAction: IUserAction = {
  login: async (data) => {
    const result = await axiosClient.post("/user/login", data);
    return result.data;
  },
  myInfo: async () => {
    const result = await axiosClient.get("/user/me");
    return result.data;
  },
  update: async (data) => {
    const result = await axiosClient.put(`/user/${data.id}`, {
      ...data,
      id: undefined,
    });
    return result.data;
  },
  delete: async (id) => {
    const result = await axiosClient.delete(`/user/${id}`);
    return result.data;
  },
  add: async (data) => {
    const result = await axiosClient.post("/user/register", data);
    return result.data;
  },
  getAll: async () => {
    try {
      const result = await axiosClient.get("/user");
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  updateMyInfo: async (data) => {
    try {
      const result = await axiosClient.put("/user", data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
  register: async (data) => {
    const result = await axiosClient.post("/user/registernewuser", data);
    return result.data;
  },
};

export default UserAction;
