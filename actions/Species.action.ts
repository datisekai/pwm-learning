import axiosClient from "../config/axiosClient"

const SpeciesAction = {
    getAll:async() => {
        try {
            const result = await axiosClient.get('/species');
            return result.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default SpeciesAction