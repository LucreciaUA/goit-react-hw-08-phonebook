
import { useDispatch, useSelector } from 'react-redux';
import css from './contact-form.module.css'

import { getContacts } from '../../redux/store/selector';
import { getContactsThunk, setContactsThunk } from '../../redux/store/contactsSlicer';



export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const token = useSelector(state => state.authorisation.token)
  console.log(token)
  

 const addContacts = (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const number = e.target.elements.number.value;

    // Check for empty fields
    if (name === '' || number === '') {
      return; // Exit if name or phone is empty
    }

    const newContact = {
      
      name,
      number,      
    };

   console.log(newContact)
   
    const isExisting = contacts.some(contact =>
      contact.number === newContact.number
    );
        
    if (!isExisting) {
      dispatch(setContactsThunk({newContact, token})).then(() => {
        // This will be executed after the deletion is complete
        dispatch(getContactsThunk(token));
    });
    } else {
      alert(`${newContact.name} is already in your contacts`);
    }
    
    e.currentTarget.reset();
  };
  
        return (<form onSubmit={addContacts}>
                <label htmlFor="name">Name</label><br />
                    <input type="text" className={css.input} name="name" id="name" required/><br />
                <label htmlFor="number">Phone</label><br />
                    <input type="tel" name="number" id="number" required /><br />
                <button type="submit" className={css.submit}>Add contact</button>
                </form>)
    
}