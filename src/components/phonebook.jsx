
import css from './phonebook.module.css'
import { ContactForm } from "./contact-form/contact-form";
import { Filter } from "./filter/filter";
import { ContactList } from "./contact-list/contact-list";
import React from 'react';


const Phonebook = ()=> {


        return (
            <div className={css.wrapper}>
            <h1>Phonebook</h1>
                <ContactForm />
            <h2>Contacts</h2>
                <Filter/>
                <ContactList />

            </div>
    )
}



export default Phonebook