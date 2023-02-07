import axiosClient from "../config/axiosClient";
import { ActionModel } from "../models/Action.model";
import { PermissionModel } from "../models/Permission.model";

interface IPermissionAction {
  getAll: () => Promise<PermissionModel[]>;
  add: (data: any) => Promise<PermissionModel>;
  update: (data: any) => Promise<any>;
  delete: (id: number | string) => Promise<any>;
  getActions: () => Promise<ActionModel[]>;
  setPermission: (data: {
    id: number | string;
    detailActions: number[];
  }) => Promise<any>;
}

const PermissionAction:IPermissionAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/permission");
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  add: async (data: any) => {
    const result = await axiosClient.post("/permission", data);
    return result.data;
  },
  update: async (data: any) => {
    const result = await axiosClient.put(`/permission/${data.id}`, {
      ...data,
      id: undefined,
    });
    return result.data;
  },
  delete: async (id: string | number) => {
    const result = await axiosClient.delete(`/permission/${id}`);
    return result.data;
  },
  getActions: async () => {
    try {
      const result = await axiosClient.get(`/permission/action`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
  setPermission: async (data: {
    id: number | string;
    detailActions: number[];
  }) => {
    const result = await axiosClient.post(`/permission/action/${data.id}`, {
      detailActions: data.detailActions,
    });
    return result.data;
  },
};

export default PermissionAction;
