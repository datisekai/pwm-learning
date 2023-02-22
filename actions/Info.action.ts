import axiosClient from "../config/axiosClient";
import { InfoModel } from "../models/Info.model";

interface IInfoAction {
  getAll: () => Promise<InfoModel[]>;
  add: (data: any) => Promise<InfoModel>;
  update: (data: any) => Promise<InfoModel>;
  delete: (id: number | string) => Promise<any>;
}

const InfoAction:IInfoAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/info");
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  add: async (data: any) => {
    const result = await axiosClient.post("/info", data);
    return result.data;
  },
  update: async (data: any) => {
    const result = await axiosClient.put(`/info/${data.id}`, data);
    return result.data;
  },
  delete: async (id: string | number) => {
    const result = await axiosClient.delete(`/info/${id}`);
    return result.data;
  },
};

export default InfoAction;
