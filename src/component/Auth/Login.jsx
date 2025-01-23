import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { loginUser } from "../../services/operations/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BASE_URL } from "../../services/api";
import { clientId } from "../../data/data";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        keepLoggedIn: true,
    });

    const { profileData, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation(); 
    const dispatch = useDispatch();
  
    const from = location.state?.from?.pathname || "/dashboard"; 
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await loginUser(formData, navigate, formData.keepLoggedIn, dispatch);
      navigate(from, { replace: true });  
    };

    const handleSuccess = async (credentialResponse) => {
        const { credential } = credentialResponse;
        try {
            const response = await fetch(`${BASE_URL}/auth/google-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: credential }), 
            });
    
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("profileData", JSON.stringify(data?.user));  
                localStorage.setItem("token", data?.token); 
                navigate("/dashboard");
                console.log("GOOGLE LOGIN SUCCESSFULL !")
            } else {
                console.error('Google login failed:', await response.json());
                
            }
        } catch (error) {
            console.error('Error sending credential to backend:', error);
        }
    };

    const handleFailure = () => {
        console.error('Login Failed');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email Address / mobile number"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full py-2 pl-10 pr-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="w-full py-2 pl-10 pr-4 border rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-between text-gray-600 text-sm">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="keepLoggedIn"
                                checked={formData.keepLoggedIn}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2">Keep me logged in</span>
                        </label>
                        <a href="/forgot-password" className="text-gray-500 hover:text-blue-500">
                            Forgot your password
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Submit
                    </button>
                    <div className="flex items-center justify-center mt-4 text-gray-500">
                        <span className="mr-2">or</span>
                    </div>
                    <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-center mb-6">Login with Google</h2>
                        <GoogleOAuthProvider clientId={clientId}>
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleFailure}
                                useOneTap
                            />
                        </GoogleOAuthProvider>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Don’t have an account? <a href="/register/customer" className="text-blue-500 hover:underline">Register now</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
