import { api } from "./api";

export const updateContact = async (id, updatedData) => {

const {data} = await api.put(`/contact/${id}`, updatedData);
    console.log(data)
    return data
    
};