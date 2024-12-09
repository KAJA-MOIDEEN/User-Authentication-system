import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Register user
    const register = async (formData) => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/auth/register`, formData, { withCredentials: true });
            if (response.status === 201) {
                toast.success(response.data.message);
                setIsAuth(true);
                navigate("/dashboard");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    // Login user
    const login = async (formData) => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/auth/login`, { email: formData.email, password: formData.password }, { withCredentials: true });
            if (response.status === 200) {
                toast.success(response.data.message);
                setIsAuth(true);
                navigate("/dashboard");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    // Logout user
    const logout = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/auth/logout`, { withCredentials: true });

            if (response.status === 200) {
                toast.success("Logged out successfully");
                setIsAuth(false);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during logout:", error.message);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };



    // forgot password
    const forgotPassword = async (formData) => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/auth/forgot-password`, { email: formData.email }, { withCredentials: true });
            if (response.status === 200) {
                navigate(`/reset-password/${response.data.token}/${response.data._id}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };
    // reset Password   
    const resetPassword = async (formData, id, _id) => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/auth/reset-password/${id}/${_id}`, { currentPassword: formData.currentPassword, newPassword: formData.newPassword, confirmPassword: formData.confirmPassword }, { withCredentials: true })
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    };

    const data = {
        isAuth,
        backendUrl,
        setIsAuth,
        navigate,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
        loading, setLoading
    };

    return <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>;
};
