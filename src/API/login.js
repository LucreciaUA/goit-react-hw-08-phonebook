import { api, setAuthorizationToken } from "./api";

export const login = async (newData) => {

    const { data } = await api.post(`/users/login`, newData);
    setAuthorizationToken(data.token)
   
    console.log(data)
    return data
    
};