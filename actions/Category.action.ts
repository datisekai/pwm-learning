import axiosClient from "../config/axiosClient"

const CategoryAction = {
    getAll:async() => {
        try {
            const result = await axiosClient.get('/category');
            return result.data
        } catch (error) {
            console.log(error)
        }
    },
   add:async(data:{name:string, speciesId:string | number}) => {
        const result = await axiosClient.post('/category',data);
        return result.data
   },
   update:async(data:any) => {
        const result = await axiosClient.put(`/category/${data.id}`,data);
        return result.data;
   },
   delete:async(id:string | number) => {
        const result = await axiosClient.delete(`/category/${id}`)
        return result.data
   }
}

export default CategoryAction