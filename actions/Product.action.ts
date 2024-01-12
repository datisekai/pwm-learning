import { toast } from "react-hot-toast";
import axiosClient from "../config/axiosClient";
import { ProductModel } from "../models/Product.model";

interface IProductAction {
  add: (data: any) => Promise<any>;
  add1: (data: any) => Promise<any>;
  getAll: () => Promise<ProductModel[]>;
  update: (data: any) => Promise<any>;
  delete: (id: number | string) => Promise<any>;
  search: (
    query: any
  ) => Promise<{ products: ProductModel[]; totalPage: number }>;
  detail: (slug: string) => Promise<ProductModel>;
  updateAttr: (data: any) => Promise<ProductModel>;
}

const ProductAction: IProductAction = {
  add: async (data: any) => {
    const result = await axiosClient.post("/product", data);
    return result.data;
  },
  add1: async (data: any) => {
    const result = await axiosClient.post("/product/add1", data);
    return result.data;
  },
  getAll: async () => {
    try {
      const result = await axiosClient.get("/product");
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  update: async (data: any) => {
    const result = await axiosClient.put(`/product/${data.id}`, {
      ...data,
      id: undefined,
    });
    return result.data;
  },
  delete: async (id: number | string) => {
    const result = await axiosClient.delete(`/product/${id}`);
    return result.data;
  },
  search: async (query: any) => {
    try {
      const result = await axiosClient.get("/product/search", {
        params: query,
      });
      return result.data;
    } catch (error) {
      return {
        products: [],
        count: 0,
      };
    }
  },
  detail: async (slug: string) => {
    try {
      const result = await axiosClient.get(`/product/detail/${slug}`);
      return result.data;
    } catch (error) {
      return null;
    }
  },
  updateAttr: async (data) => {
    try {
      const result = await axiosClient.put(
        `/product/attribute/${data.productId}`,
        data
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default ProductAction;
