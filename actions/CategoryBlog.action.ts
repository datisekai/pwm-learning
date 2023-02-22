import axiosClient from "../config/axiosClient";
import { CategoryBlogModel } from "../models/CategoryBlog.model";

interface ICategoryBlogAction{
  getAll:() => Promise<CategoryBlogModel[]>
  add:(name:string) => Promise<CategoryBlogModel>
  update:(data:any) => Promise<any>
  delete:(id:number | string) => Promise<any>
  getBySlug:(data:any) => Promise<any>
  getByUser:(data:any) => Promise<CategoryBlogModel[]>
  setMenu:(id: number | string) => Promise<any>
}

const CategoryBlogAction:ICategoryBlogAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/category-blog");
      return result.data;
    } catch (error) {
      console.log(error);
      return []
    }
  },
  add: async (name: string) => {
    const result = await axiosClient.post("/category-blog", { name });
    return result.data;
  },
  update:async(data:any) => {
    const result = await axiosClient.put(`/category-blog/${data.id}`,{...data});
    return result.data
  },
  delete:async(id: number | string) => {
    const result = await axiosClient.delete(`/category-blog/${id}`);
    return result.data;
  },
  getBySlug:async(data:any) => {
    try {
        const result = await axiosClient.get(`/category-blog/search?slug=${data.slug}&page=${data.page || 1}&limit=${data.limit}`)
        return result.data      
    } catch (error) {
      console.log(error)
      return null
    }
  },
  getByUser:async() => {
      const result = await axiosClient.get("/category-blog/user");
      return result.data;
  },
  setMenu:async(id:number | string) => {
    try {
      const result = await axiosClient.put(`/category-blog/menu/${id}`);
      return result.data;      
    } catch (error) {
      return null
    }
  }
};

export default CategoryBlogAction;
