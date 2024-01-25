import { useDispatch, useSelector } from "react-redux"
import { logoutThunk } from "../../../redux/store/authorisationSlicer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import css from './user-page.module.css'

export const UserPage = () => {
    const username = useSelector(state => state.authorisation.user.email)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.authorisation.isLoggedIn)
    const token = useSelector(state => state.authorisation.token)
    console.log(username)
    
    useEffect(() => {
        if (isLoggedIn === false) {
            navigate('/')
        }
    })
    const logOutUser = () => {
        
        dispatch(logoutThunk(token)).then(() => {
            
            navigate('/');
        }
        )
    }
    return (
        <div className={css.wrap}>
            <h2>Welcome, {username}</h2>
            <button type="button" onClick={logOutUser} className={css.logout}>Log Out</button>
        </div>
    )
}