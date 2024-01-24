import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "API/login";
import { logout } from "API/logout";
import { signUp } from "API/signup";

export const signupThunk = createAsyncThunk(
  `authorisation/signup`,
  async (newUser, { rejectWithValue }) => {
    try{
    const data = await signUp(newUser)
      return data
    }
    catch(error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const loginThunk = createAsyncThunk(
  `authorisation/login`,
  async (userData, { rejectWithValue }) => {
    try{
    const data = await login(userData)
      return data
    }
    catch(error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const logoutThunk = createAsyncThunk(
  `authorisation/logout`,
  async (token, { rejectWithValue }) => {
    try{
    const data = await logout(token)
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

const setState = (state, action) => {
    state.user.name = action.payload.user.name;
    state.user.email = action.payload.user.email;
    state.token = action.payload.token;
}

const setlogState = (state, action) => {
    state.user.name = action.payload.user.name;
    state.user.email = action.payload.user.email;
    state.token = action.payload.token;
    state.isLoggedIn = true;
    localStorage.setItem('token', action.payload.token);
}

const resetState = (state) => {
    state.user = { name: '', email: '' };
    state.token = '';
    state.isLoggedIn = false;
    localStorage.clear()
};


export const authorisationSlicer = createSlice({
    name: `authorisation`,
    initialState:{
        user: { name: '', email: ''},
        token: '',
        isLoggedIn: false,
    },

    extraReducers: (builder) => {
    builder
        .addCase(signupThunk.fulfilled, setState)
        .addCase(loginThunk.fulfilled, setlogState)
        .addCase(logoutThunk.fulfilled,resetState)
      



      .addMatcher((action) => action.type.endsWith('/pending'), handlePending)
      .addMatcher((action) => action.type.endsWith('/fulfilled'), handleFulfilled)
      .addMatcher((action) => action.type.endsWith('/rejected'), handleRejected)
    
    
  }
    
})

export const authorisationReducer = authorisationSlicer.reducer;