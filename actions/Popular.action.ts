import axiosClient from "../config/axiosClient";

const PopularAction = {
  getAll: async () => {
    try {
      const result = await axiosClient.get("/popular");
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  popular: async (productId: number | string) => {
    const result = await axiosClient.post(`/popular`, { productId });
    return result.data;
  },
};

export default PopularAction;
