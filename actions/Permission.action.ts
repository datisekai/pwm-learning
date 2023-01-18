import axiosClient from "../config/axiosClient";

const PermissionAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/permission");
      return result.data;
    } catch (error) {
      console.log(error);
      return []
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
  getActions: async (token: string) => {
    try {
      const result = await axiosClient.get(`/permission/action`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
  setPermission:async(data:{id:number | string, detailActions:number[]}) => {
    const result = await axiosClient.post(`/permission/action/${data.id}`,{detailActions:data.detailActions})
    return result.data;
  }
};

export default PermissionAction;
