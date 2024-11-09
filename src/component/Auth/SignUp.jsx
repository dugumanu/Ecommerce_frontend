import React, { useState } from "react";
import { FaUser, FaEnvelope, FaMobileAlt, FaLock } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { signupUser } from "../../services/operations/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function Signup() {
    const {role} = useParams();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
        role : role === "seller" ? "seller" : "customer"
    });
    
    

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const navigate = useNavigate();
    const dispatch  = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);

        

        if(!formData.termsAccepted) {
            toast.error("Read and Accept all Terms and Conditions")
            return
        }

        if(formData.password !== formData.confirmPassword){
            toast.error("Enter same password");
            return
        }
        const response = await signupUser(formData,navigate);
        console.log("response from login ", response)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Register {role === "seller" && "as Seller" } </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <FaMobileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            required
                            className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                            required
                            className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="text-sm text-gray-600">
                            By registering, you accept our <span className="text-blue-500">Terms & Conditions</span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-green text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Register
                    </button>
                    <div className="flex items-center justify-center mt-4 text-gray-500">
                        <span className="mr-2">or</span>
                    </div>
                    <button
                        type="button"
                        className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Sign in with Google
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account? <a href="/login" className="text-blue-500">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
