import { toast } from 'react-hot-toast';
import { authEndpoints } from '../api';
import { apiconnector } from '../apiconnector';
import { setProfileData, setToken } from '../../slices/authSlice';

const { LOGIN_API, SIGNUP_API } = authEndpoints;

export const loginUser = async (loginData,navigate,keptmelogin,dispatch) => {
    const toastId = toast.loading("Logging in...");

    try {
        const response = await apiconnector("POST", LOGIN_API, loginData);

        if (response?.data?.success) {
            toast.success("Logged in successfully");
            console.log("Data : ", response?.data?.existingUser)
            dispatch(setToken(response?.data?.token))
            dispatch(setProfileData(response?.data?.existingUser))
            if(keptmelogin) {
                
               localStorage.setItem("profileData", response?.data?.existingUser)
               localStorage.setItem("token", response?.data?.token)

            }
            navigate(-1);
            return response.data;
        } else {
            const errorMessage = response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "An unexpected error occurred during login.");
        console.error("LOGIN ERROR:", error);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};

export const signupUser = async (signupData,navigate) => {
    const toastId = toast.loading("Signing up...");

    try {
        const response = await apiconnector("POST", SIGNUP_API, signupData);
        console.log("response", response);

        if (response?.data?.success) {
            toast.success("Signed up successfully");
            navigate("/login")
            return response.data;
        } else {
            const errorMessage = response?.data?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || "An unexpected error occurred during signup.";
        toast.error(errorMsg);
        console.error("SIGNUP ERROR:", error);
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};


export  const logout = (dispatch) => {
    dispatch(setToken(null))
    dispatch(setProfileData(null))
    localStorage.removeItem("profileData");
    localStorage.removeItem("token")
    localStorage.removeItem("cart")
}