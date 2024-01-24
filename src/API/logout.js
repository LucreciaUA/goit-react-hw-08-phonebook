import { api } from "./api";

export const logout = async (token) => {

 const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };


const {data} = await api.post(`/users/logout`, {}, config);
    console.log(data)
    return data
    
};