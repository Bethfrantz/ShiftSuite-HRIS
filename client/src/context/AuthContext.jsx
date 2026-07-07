import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    // SAFE TOKEN LOAD
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken || "");

    // SAFE USER LOAD
    const storedUser = localStorage.getItem("user");
    let initialUser = null;

    try {
        initialUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
        console.error("Invalid user JSON in localStorage — clearing it.");
        localStorage.removeItem("user");
        initialUser = null;
    }

    const [user, setUser] = useState(initialUser);

    // LOGIN
    const login = (data) => {
        setToken(data.token);
        setUser(data.user);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "Manager") {
            navigate("/manager/dashboard");
        } else {
            navigate("/employee/dashboard");
        }
    };

    // LOGOUT
    const logout = () => {
        setToken("");
        setUser(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
