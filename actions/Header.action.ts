import axiosClient from "../config/axiosClient"

const HeaderAction = {
    getHeader:async() => {
        const result  = await axiosClient.get('/header');
        return result.data
    }
}

export default HeaderAction