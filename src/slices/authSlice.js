import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpData : null,
  profileData: localStorage.getItem("profileData") || null,
  loading: false,
  token: localStorage.getItem("token") || null,

  paymentLoading : false
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setProfileData(state, value) {
      state.profileData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    setSignUpData(state, action) {
        state.signUpData = action.payload
    },
    setPaymentLoading(state,action) {
      state.paymentLoading = action.payload
    }
  },
});

export const { setProfileData,setPaymentLoading, setLoading, setToken, setSignUpData } = authSlice.actions;

export default authSlice.reducer;