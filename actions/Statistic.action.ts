import axiosClient from "../config/axiosClient";

const StatisticAction = {
  count: async () => {
    try {
      const result = await axiosClient.get("/statistic");
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
  latest: async () => {
    try {
      const result = await axiosClient.get("/statistic/latest");
      return result.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default StatisticAction;
