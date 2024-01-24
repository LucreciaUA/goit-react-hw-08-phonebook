import { api } from "./api";

export const deleteContact = async (id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

const {data} = await api.delete(`/contacts/${id}`, config);
    console.log(data)
    return data
    
};
