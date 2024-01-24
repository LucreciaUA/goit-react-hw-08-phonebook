import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlicer';
import { searchReducer } from './searchSlicer';
import { authorisationReducer } from './authorisationSlicer';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: searchReducer,
    authorisation: authorisationReducer,
  },
});