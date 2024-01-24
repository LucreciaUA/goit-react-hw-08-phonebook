import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from 'API/getcontacts';
import { setData } from 'API/setcontacts';
import { deleteContact } from 'API/deletecontact';



export const getContactsThunk = createAsyncThunk(
  `contacts/getContacts`,
  async (token, { rejectWithValue }) => {
    try{
    const data = await getData(token)
      return data
    }
    catch(error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const setContactsThunk = createAsyncThunk(
  `contacts/setContacts`,
  async ({newContact, token}, { rejectWithValue }) => {
    try{
    const data = await setData({newContact, token})
      return data
    }
    catch(error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deleteContactThunk = createAsyncThunk(
  `contacts/deleteContact`,
  async ({id, token}, { rejectWithValue }) => {
    try{
    const data = await deleteContact({id, token})
      return data
    }
    catch(error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const handleFulfilled = (state) => {
  state.isLoading = false;
}

const handlePending = (state) => {
   state.isLoading = true;
    state.error = '';
}

const handleRejected = (state, action) => {
  state.isLoading = false;
        state.error = action.payload
}

export const contactsSlicer = createSlice({
  name: 'contacts',
  initialState:{
    contacts: [],
    isLoading: false,
    error: '',
  },

  extraReducers: (builder) => {
    builder
      .addCase(getContactsThunk.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(setContactsThunk.fulfilled, (state, action) => {
        state.contacts.push(action.payload); // Assuming this adds a new contact
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
    // Filter out the contact that needs to be deleted
    state.contacts = state.contacts.filter(contact => contact.id !== action.payload);

})

      .addMatcher((action) => action.type.endsWith('/pending'), handlePending)
      .addMatcher((action) => action.type.endsWith('/fulfilled'), handleFulfilled)
      .addMatcher((action) => action.type.endsWith('/rejected'), handleRejected)
    
    
  }
});


export const contactsReducer = contactsSlicer.reducer;