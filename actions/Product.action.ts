import { toast } from "react-hot-toast"
import axiosClient from "../config/axiosClient"

const ProductAction = {
    add:async(data:any) => {
        try {
            const result = await axiosClient.post('/product',data);
            return result.data
        } catch (error) {
            console.log(error)
            toast.error("Lỗi trong quá trình thêm, vui lòng thử lại")
        }
    },
    getAll:async() => {
        try {
            const result = await axiosClient.get('/product');
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductAction