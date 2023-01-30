import axiosClient from "../config/axiosClient"

const SliderAction = {
    getAll:async() => {
        try {
            const result = await axiosClient.get('/slider');
            return result.data
        } catch (error) {
            console.log(error)
            return []
        }
    },
   add:async(data:any) => {
        const result = await axiosClient.post('/slider',data);
        return result.data
   },
   update:async(data:any) => {
        const result = await axiosClient.put(`/slider/${data.id}`,data);
        return result.data;
   },
   delete:async(id:string | number) => {
        const result = await axiosClient.delete(`/slider/${id}`)
        return result.data
   }
}

export default SliderAction