import axiosClient from "../config/axiosClient";
import {SpeciesModel} from '../models/Species.model'

interface ISpeciesAction{
  getAll:(status?:number) => Promise<SpeciesModel[]>
  add:(data:any) => Promise<SpeciesModel>
  update:(data:any) => Promise<SpeciesModel>
  delete:(id: number | string) => Promise<any>
  home:() => Promise<any>
  setMenu:(id:number | string) => Promise<SpeciesModel>
}

const SpeciesAction:ISpeciesAction = {
  getAll: async (status = 0) => {
    try {
      const result = await axiosClient.get(`/species?status=${status}`);
      return result.data;
    } catch (error) {
      console.log(error);
      return []
    }
  },
  add: async (data:any) => {
    const result = await axiosClient.post("/species", data);
    return result.data;
  },
  update: async (data: any) => {
    const result = await axiosClient.put(`/species/${data.id}`, data);
    return result.data;
  },
  delete: async (id: string | number) => {
    const result = await axiosClient.delete(`/species/${id}`);
    return result.data;
  },
  home:async() => {
    try {
      const result = await axiosClient.get('/species/user?limit=8')
      return result.data
    } catch (error) {
      return []
    }
  },
  setMenu:async(id:number | string) => {
    try {
      const result = await axiosClient.put(`/species/menu/${id}`);
      return result.data;      
    } catch (error) {
      return null
    }
  }
};

export default SpeciesAction;
