import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAuthorizationToken } from "API/api";
import { login } from "API/login";
import { logout } from "API/logout";
import { signUp } from "API/signup";
import { verifyUser } from "API/verify";

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
      setAuthorizationToken('')
      return data
    }
    catch(error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const verifyUserThunk = createAsyncThunk(
  `authorisation/verify`,
  async (_, { rejectWithValue, getState }) => {
    const token = getState().authorisation.token
    if (token) {
      setAuthorizationToken(token)
    try {
      
      const data = await verifyUser()
      console.log(data)
      return data
    }
    catch(error){
      return rejectWithValue(error.response.data)
      }
    }
    return rejectWithValue('No token')
  }
)

//export const saveToLocalStorage = (state) => {
//  try {
//    const serializedState = JSON.stringify(state);
//    localStorage.setItem('authState', serializedState);
//  } catch (e) {
//    console.warn(e);
//  }
//};

// Load state from local storage
//export const loadFromLocalStorage = () => {
//  try {
//    const serializedState = localStorage.getItem('authState');
//    if (serializedState === null) return undefined;
//    return JSON.parse(serializedState);
//  } catch (e) {
//    console.warn(e);
//    return undefined;
//  }
//};

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
  console.log('Payload:', action.payload);
    state.user.name = action.payload.user?.name;
    state.user.email = action.payload.user?.email;
    state.token = action.payload.token;
    state.isLoggedIn = true;
    
}

const setVerifyState = (state, action) => {
  console.log('Payload:', action.payload);
    state.user.name = action.payload.name;
    state.user.email = action.payload.email;
    state.token = action.payload.token;
    state.isLoggedIn = true;
    
}


const resetState = (state) => {
    state.user = { name: '', email: '' };
    state.token = '';
    state.isLoggedIn = false;
    //localStorage.removeItem('authState'); 
};


export const authorisationSlicer = createSlice({
    name: `authorisation`,
    initialState:{
        user: { name: '', email: ''},
        token: '',
      isLoggedIn: false,
        isVerified: false,
    },

    extraReducers: (builder) => {
    builder
        .addCase(signupThunk.fulfilled, setState)
        .addCase(loginThunk.fulfilled, setlogState)
        .addCase(logoutThunk.fulfilled, resetState)
      //.addCase(loginThunk.rejected, localStorage.removeItem('authState'))
      .addCase(verifyUserThunk.fulfilled, setVerifyState)
      //.addCase(verifyUserThunk.rejected, ((action, playload)=>{localStorage.clear()}))
      



      .addMatcher((action) => action.type.endsWith('/pending'), handlePending)
      .addMatcher((action) => action.type.endsWith('/fulfilled'), handleFulfilled)
      .addMatcher((action) => action.type.endsWith('/rejected'), handleRejected)
    
    
  }
    
})

export const authorisationReducer = authorisationSlicer.reducer;