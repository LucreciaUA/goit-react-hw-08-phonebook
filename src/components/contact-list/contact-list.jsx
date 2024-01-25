import React, { useEffect } from "react"; 
import css from './contact-list.module.css'
import { nanoid } from "nanoid";
import { deleteContactThunk, getContactsThunk } from "../../redux/store/contactsSlicer";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, getSearch } from "../../redux/store/selector";


export const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const search = useSelector(getSearch);
    const isLoading = useSelector(state => state.contacts.isLoading);
    const error = useSelector(state => state.contacts.error);
    const isLoggedIn = useSelector(state => state.authorisation.isLoggedIn)
  
    useEffect(() => {
        if(isLoggedIn){
            dispatch(getContactsThunk());
        }
     
    }, [dispatch, isLoggedIn]);

    if (!isLoggedIn) {
        return <p>Please log in to view contacts.</p>;
    }


    const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

    const delContact = (id) => {
        
        dispatch(deleteContactThunk(id)
        ).then(() => {
        // This will be executed after the deletion is complete
        dispatch(getContactsThunk());
    })
        
    }
if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        const errorMessage = error.message ? error.message : 'Error loading contacts';
    return <p>Error loading contacts: {errorMessage}</p>;
    }

    return (
        <ul>
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact) => {
                                const { name, number } = contact;
                                return (
                                    <li key={nanoid()}>
                                        <div className={css.wrap}><span className={css.name}>{name}</span><span> {number}</span></div>
                                         
        
                                    <button type="button" className={css.delete} onClick={() => delContact(contact.id)}>
                                        -</button>
                                    </li>
                                );
                            })
                        ) : (
                            <p>No contacts found.</p>
                        )}
                    </ul>
    )

}