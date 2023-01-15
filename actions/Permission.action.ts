import axiosClient from "../config/axiosClient";

const PermissionAction = {
    getAll:async() => {
        try {
            const result = await axiosClient.get('/permission');
            return result.data;
        } catch (error) {
            console.log(error)
        }
    }
}

export default PermissionAction