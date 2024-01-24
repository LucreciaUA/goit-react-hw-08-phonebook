import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlicer';
import { searchReducer } from './searchSlicer';
import { authorisationReducer, loadFromLocalStorage, saveToLocalStorage } from './authorisationSlicer';

const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: searchReducer,
    authorisation: authorisationReducer,
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  saveToLocalStorage({
    authorisation: store.getState().authorisation
  });
});