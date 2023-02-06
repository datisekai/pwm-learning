import axiosClient from "../config/axiosClient";

const UIAction = {
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
