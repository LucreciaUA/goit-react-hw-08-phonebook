import React from "react";
import css from './header.module.css'
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const Header = () => {
    const isLoggedIn =useSelector(state => state.authorisation.isLoggedIn)
    return (
        <header>
            <NavLink to='/'><span>Phonebook</span></NavLink>
            <ul>
                {!isLoggedIn && (<>
                    <li className={css.navbuttos}><NavLink to='/signup'>Sign up</NavLink></li>
                    <li className={`${css.navbuttos} ${css.login}`}><NavLink to='/login'>Login</NavLink></li>
                </>)}
                {isLoggedIn && <li className={css.navbuttos}><NavLink to='/user'>user</NavLink></li>}
            </ul>
        </header>
    )
}