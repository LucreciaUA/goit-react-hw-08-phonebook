import { api } from "./api";

export const getData = async (token) => {

     const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

const {data} = await api.get(`/contacts`, config);
    console.log(data)
    return data
    
};