import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk} from '../../../redux/store/authorisationSlicer';
import { useNavigate } from "react-router-dom";
 
export const LoginPage = () => {
    const dispatch = useDispatch();
    const username =useSelector(state => state.authorisation.user.name)
    const navigate = useNavigate()
    const logUser = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;

        const password = e.target.elements.password.value;
        
    const user={
        email,
        password,
    }
        console.log(user)

        dispatch(loginThunk(user))
        .then((response) => {
        if (response.type.endsWith('fulfilled')) {
            alert(`Welcome, ${username}`);
            navigate('/');
        } else {
            alert('Something went wrong');
        }
    });
    }

    return (
        <div>
            <h1>Welcome, user!</h1>
            <form action="" onSubmit={logUser}>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}