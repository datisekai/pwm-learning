import axiosClient from "../config/axiosClient";

const SpeciesAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/species");
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
  add: async (name: string) => {
    const result = await axiosClient.post("/species", { name });
    return result.data;
  },
  update: async (data: any) => {
    const result = await axiosClient.put(`/species/${data.id}`, data);
    return result.data;
  },
  delete: async (id: string | number) => {
    const result = await axiosClient.delete(`/species/${id}`);
    return result.data;
  },
};

export default SpeciesAction;
