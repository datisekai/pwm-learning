import { setCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import axiosClient from "../config/axiosClient";

const UserAction = {
  login: async (data:{email: string, password: string}) => {
      const result = await axiosClient.post("/user/login", data);
      return result.data;
  },
  myInfo: async () => {
      const result = await axiosClient.get("/user/me");
      return result.data;
  },
  update:async(data:any) => {
    const result = await axiosClient.put(`/user/${data.id}`, {...data, id:undefined});
    return result.data;
  },
  delete:async(id:number | string) => {
    const result = await axiosClient.delete(`/user/${id}`);
    return result.data;
  },
  add:async(data:any) => {
    const result = await axiosClient.post('/user/register',data);
    return result.data;
  },
  getAll:async(token:string) => {
    try {
      const result = await axiosClient.get('/user',{
        headers:{
          Authorization:`Bearer ${token || ""}`
        }
      });
      return result.data
    } catch (error) {
      console.log(error)
      return []
    }
  }
};

export default UserAction;
