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
