import { api } from "./api";

export const setData = async (newData) => {

    const { data } = await api.post(`/contacts`, newData);
    
    console.log(data)
    return data
    
};