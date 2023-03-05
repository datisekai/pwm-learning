import axiosClient from "../config/axiosClient";
import { OrderModel } from "../models/Order.model";

interface IOrderAction{
  getAll:() => Promise<OrderModel[]>
  add:(data:any) => Promise<any>
  addByAdmin:(data:any) => Promise<any>
  update:(data:any) => Promise<any>
  delete:(id:number | string) => Promise<any>
  search:(status:string) => Promise<OrderModel[]>
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
  addByAdmin: async (data: any) => {
    const result = await axiosClient.post("/order/admin", data);
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
  search:async(status) => {
    try {
      const result = await axiosClient.get(`/order/me`);
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};

export default OrderAction;
