import axiosClient from "../config/axiosClient";
import { UIModel } from "../models/Ui.model";

interface IUIAction{
  getAll:() => Promise<UIModel[]>
  add:(data:any) => Promise<UIModel>
  update:(data:any) => Promise<any>
  delete:(id:number | string) => Promise<any>
}

const UIAction:IUIAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get(`/ui`);
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  add: async (data: any) => {
    const result = await axiosClient.post("/ui", data);
    return result.data;
  },
  update: async (data: any) => {
    const result = await axiosClient.put(`/ui/${data.id}`, data);
    return result.data;
  },
  delete: async (id: string | number) => {
    const result = await axiosClient.delete(`/ui/${id}`);
    return result.data;
  },
};

export default UIAction;
