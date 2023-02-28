import axiosClient from "../config/axiosClient";
import { OrderModel } from "../models/Order.model";

interface IOrderAction{
  getAll:() => Promise<OrderModel[]>
  add:(data:any) => Promise<OrderModel>
  update:(data:any) => Promise<any>
  delete:(id:number | string) => Promise<any>
}

const OrderAction:IOrderAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get(`/order`);
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  add: async (data: any) => {
    const result = await axiosClient.post("/order", data);
    return result.data;
  },
  update: async (data: any) => {
    const result = await axiosClient.put(`/order/${data.id}`, data);
    return result.data;
  },
  delete: async (id: string | number) => {
    const result = await axiosClient.delete(`/order/${id}`);
    return result.data;
  },
};

export default OrderAction;
