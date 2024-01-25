import React from "react";
import { useDispatch } from "react-redux";
import { signupThunk } from '../../../redux/store/authorisationSlicer';
import css from './signup-page.module.css'
 
export const SignUpPage = () => {
    const dispatch = useDispatch();
    
    const addUser = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        
    const newUser={
        name,
        email,
        password,
    }
        console.log(newUser)

        dispatch(signupThunk(newUser))
        .then((response) => {
        if (response.type.endsWith('fulfilled')) {
            alert('Now you can log into your account');
            e.currentTarget.reset();
        } else {
            localStorage.removeItem('authState')
            alert('Something went wrong');
        }
        });
        
    }

    return (
        <div className={css.wrap}>
            <h1>Welcome, new user!</h1>
            <form action="" onSubmit={addUser}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name"/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <button type="submit" className={css.submit}>Submit</button>
            </form>
        </div>
    )
}