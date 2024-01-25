import { api } from "./api";

export const deleteContact = async (id) => {


const {data} = await api.delete(`/contacts/${id}`);
    console.log(data)
    return data
    
};
