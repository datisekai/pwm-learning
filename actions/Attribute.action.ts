import axiosClient from "../config/axiosClient";
import { AttributeModel } from "../models/Attribute.model";

interface IAttributeAction {
  getAll: () => Promise<AttributeModel[]>;
  add: (data: any) => Promise<AttributeModel>;
  update: (data: any) => Promise<AttributeModel>;
  delete: (id: number) => Promise<any>;
}

const AttributeAction: IAttributeAction = {
  getAll: async () => {
    const result = await axiosClient.get("/attribute");
    return result.data;
  },
  add: async (data) => {
    const result = await axiosClient.post(`/attribute`, data);
    return result.data;
  },
  update: async (data) => {
    const result = await axiosClient.put(`/attribute/${data.id}`, data);
    return result.data;
  },
  delete: async (id) => {
    const result = await axiosClient.delete(`/attribute/${id}`);
    return result.data;
  },
};

export default AttributeAction;
