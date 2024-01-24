import { useDispatch, useSelector } from "react-redux"
import { logoutThunk } from "../../../redux/store/authorisationSlicer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const UserPage = () => {
    const username = useSelector(state => state.authorisation.user.name)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = useSelector(state => state.authorisation.token)
    
    useEffect(() => {
        if (token === '') {
            navigate('/')
        }
    })
    const logOutUser = () => {
        
        dispatch(logoutThunk(token)).then(() => {
            localStorage.clear();
            navigate('/');
        }
        )
    }
    return (
        <div>
            <p><h2>Welcome, {username}</h2></p>
            <button type="button" onClick={logOutUser}>Log Out</button>
        </div>
    )
}