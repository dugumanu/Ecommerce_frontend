import { createSlice } from "@reduxjs/toolkit";


const storedProfileData = localStorage.getItem("profileData");
const storedToken = localStorage.getItem("token");

const initialState = {
  signUpData: null,
  profileData: storedProfileData ? JSON.parse(storedProfileData) : null,  
  loading: false,
  token: storedToken ? storedToken : null,  
  paymentLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfileData(state, action) {
      state.profileData = action.payload;
      
    
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setSignUpData(state, action) {
      state.signUpData = action.payload;
    },
    setPaymentLoading(state, action) {
      state.paymentLoading = action.payload;
    },
  },
});

export const { setProfileData, setPaymentLoading, setLoading, setToken, setSignUpData } = authSlice.actions;

export default authSlice.reducer;
