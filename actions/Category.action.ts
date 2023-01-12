import axiosClient from "../config/axiosClient"

const CategoryAction = {
    getAll:async() => {
        try {
            const result = await axiosClient.get('/category');
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default CategoryAction