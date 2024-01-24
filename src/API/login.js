import { api } from "./api";

export const login = async (newData) => {

const {data} = await api.post(`/users/login`, newData);
    console.log(data)
    return data
    
};