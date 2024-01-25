import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlicer';
import { searchReducer } from './searchSlicer';
import { authorisationReducer} from './authorisationSlicer';



import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authorisationPersistConfig = {
  key: 'authorisation',
  storage,
  whitelist: ['token'],
};


export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: searchReducer,
    authorisation: persistReducer(authorisationPersistConfig ,authorisationReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});


export const persistor = persistStore(store);
