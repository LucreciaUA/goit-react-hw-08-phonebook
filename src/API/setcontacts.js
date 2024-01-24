import { api } from "./api";

export const setData = async ({newData, token}) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

const {data} = await api.post(`/contacts`, newData, config);
    console.log(data)
    return data
    
};