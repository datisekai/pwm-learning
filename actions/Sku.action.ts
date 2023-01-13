import axiosClient from "../config/axiosClient";

const SkuAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/sku");
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
  delete:async(id:number | string) => {
    const result = await axiosClient.delete(`/sku/${id}`)
    return result;
  },
  update:async(data:any) => {
    const result = await axiosClient.put(`/sku/${data.id}`,data)
    return result.data
  }
};

export default SkuAction;
