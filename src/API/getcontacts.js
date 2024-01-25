import { api } from "./api";

export const getData = async () => {



const {data} = await api.get(`/contacts`);
    console.log(data)
    return data
    
};