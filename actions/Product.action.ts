import { toast } from "react-hot-toast";
import axiosClient from "../config/axiosClient";

const ProductAction = {
  add: async (data: any) => {
    const result = await axiosClient.post("/product", data);
    return result.data;
  },
  getAll: async () => {
    try {
      const result = await axiosClient.get("/product");
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
  update:async(data:any) => {
    const result = await axiosClient.put(`/product/${data.id}`,{...data, id:undefined});
    return result.data
  },
  delete:async(id: number | string) => {
    const result = await axiosClient.delete(`/product/${id}`);
    return result.data;
  }
};

export default ProductAction;