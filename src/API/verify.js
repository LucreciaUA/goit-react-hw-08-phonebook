import { api } from "./api";

export const verifyUser = async () => {

    const { data } = await api.get(`/users/current`);
    
    console.log(data)
    return data
    
};