import axiosClient from "../config/axiosClient";

const CategoryBlogAction = {
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
    const result = await axiosClient.put(`/category-blog/${data.id}`,{...data, id:undefined});
    return result.data
  },
  delete:async(id: number | string) => {
    const result = await axiosClient.delete(`/category-blog/${id}`);
    return result.data;
  },
  getBySlug:async(slug:string) => {
    try {
        const result = await axiosClient.get(`/category-blog/search?slug=${slug}`)
        return result.data      
    } catch (error) {
      console.log(error)
      return null
    }
  },
  getByUser:async() => {
      const result = await axiosClient.get("/category-blog/user");
      return result.data;
  }
};

export default CategoryBlogAction;
