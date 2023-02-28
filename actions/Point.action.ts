import axiosClient from "../config/axiosClient";
import { ActionModel } from "../models/Action.model";
import { PointModel } from "../models/Point.model";

interface IPointAction {
  getAll: () => Promise<PointModel[]>;
  add: (data: any) => Promise<PointModel>;
  update: (data: any) => Promise<any>;
  delete: (id: number | string) => Promise<any>;
  getActions: () => Promise<ActionModel[]>;
  setPoint: (data: {
    id: number | string;
    detailActions: number[];
  }) => Promise<any>;
}

const PointAction:IPointAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/point");
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  add: async (data: any) => {
    const result = await axiosClient.post("/point", data);
    return result.data;
  },
  update: async (data: any) => {
    const result = await axiosClient.put(`/point/${data.id}`, {
      ...data,
      id: undefined,
    });
    return result.data;
  },
  delete: async (id: string | number) => {
    const result = await axiosClient.delete(`/point/${id}`);
    return result.data;
  },
  getActions: async () => {
    try {
      const result = await axiosClient.get(`/point/action`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
  setPoint: async (data: {
    id: number | string;
    detailActions: number[];
  }) => {
    const result = await axiosClient.post(`/point/action/${data.id}`, {
      detailActions: data.detailActions,
    });
    return result.data;
  },
};

export default PointAction;
