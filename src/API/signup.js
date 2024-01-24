import { api } from "./api";

export const signUp = async (newData) => {

const {data} = await api.post(`/users/signup`, newData);
    console.log(data)
    return data
    
};