import axiosClient from "../config/axiosClient";
import { SkuModel } from "../models/Sku.model";

interface ISkuAction{
  getAll:() => Promise<SkuModel[]>
  delete:(id:number | string) => Promise<any>
  update:(data:any) => Promise<SkuModel>
}

const SkuAction:ISkuAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/sku");
      return result.data;
    } catch (error) {
      console.log(error);
      return []
    }
  },
  delete:async(id:number | string) => {
    const result = await axiosClient.delete(`/sku/${id}`)
    return result;
  },
  update:async(data:any) => {
    const result = await axiosClient.put(`/sku/${data.id}`,{...data, id:undefined})
    return result.data
  }
};

export default SkuAction;
