import React from "react";
import css from './header.module.css'
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from './pngwing.com.png';

export const Header = () => {
    const isLoggedIn =useSelector(state => state.authorisation.isLoggedIn)
    return (
        <header>
            <NavLink to='/' className={css.logo}><img className={css.logoimg} src={logo} alt="logo"/>Phonebook</NavLink>
            <ul className={css.navigation}>
                {!isLoggedIn && (<>
                    <li className={css.navbuttons}><NavLink to='/signup' className={css.text}>Sign up</NavLink></li>
                    <li className={`${css.navbuttons} ${css.login}`}><NavLink to='/login' className={css.textlogin}>Login</NavLink></li>
                </>)}
                {isLoggedIn && <li className={css.navbuttons}><NavLink to='/user' className={css.text}>User</NavLink></li>}
            </ul>
        </header>
    )
}