
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem("authToken")||null,
    role: null,
    personname: null,
    isAuthenticated:localStorage.getItem("authToken")?true: false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.personname = action.payload.personname;
      state.isAuthenticated = true;
      localStorage.setItem('authToken', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.personname = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
    token:(state,action)=>{
      state.isAuthenticated = true;
      state.token = action.payload.token;

    }
  },
});

export const { login, logout,token } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
