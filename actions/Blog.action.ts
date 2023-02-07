import axiosClient from "../config/axiosClient";
import { BlogModel } from "../models/Blog.model";

interface IBlogAction{
  getAll:() => Promise<BlogModel[]>
  add:(data:any) => Promise<BlogModel>
  update:(data:any) => Promise<BlogModel>
  delete:(id: number | string) => Promise<any>
  getById:(id: number | string) =>  Promise<BlogModel>
  increaseView:(slug:string) => Promise<any>
  getBySlug:(slug:string) => Promise<BlogModel>
  search:(data:any) => Promise<BlogModel[]>
}

const BlogAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/blog");
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  add: async (data: any) => {
    const result = await axiosClient.post("/blog", data);
    return result.data;
  },
  update: async (data: any) => {
    const result = await axiosClient.put(`/blog/${data.id}`, {
      ...data,
      id: undefined,
    });
    return result.data;
  },
  delete: async (id: number | string) => {
    const result = await axiosClient.delete(`/blog/${id}`);
    return result.data;
  },
  getById: async (id: number | string) => {
    try {
      const result = await axiosClient.get(`/blog/${id}`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
  increaseView: async (slug: string) => {
    const result = await axiosClient.get(`/blog/increase/${slug}`);
    return result.data;
  },
  getBySlug: async (slug: string) => {
    try {
      const result = await axiosClient.get(`/blog/detail/${slug}`);
      return result.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  search: async (data: any) => {
    const result = await axiosClient.get("/blog/search/recommend", {
      params: data,
    });
    return result.data
  },
};

export default BlogAction;
