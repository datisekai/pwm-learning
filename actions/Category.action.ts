import axiosClient from "../config/axiosClient";
import { CategoryModel } from "../models/Category.model";

interface ICategoryAction {
  getAll: () => Promise<CategoryModel[]>;
  add: (data: {
    name: string;
    speciesId: string | number;
  }) => Promise<CategoryModel>;
  update: (data: any) => Promise<CategoryModel>;
  delete: (id: string | number) => Promise<any>;
}

const CategoryAction: ICategoryAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/category");
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  add: async (data) => {
    const result = await axiosClient.post("/category", data);
    return result.data;
  },
  update: async (data) => {
    const result = await axiosClient.put(`/category/${data.id}`, data);
    return result.data;
  },
  delete: async (id) => {
    const result = await axiosClient.delete(`/category/${id}`);
    return result.data;
  },
};

export default CategoryAction;
