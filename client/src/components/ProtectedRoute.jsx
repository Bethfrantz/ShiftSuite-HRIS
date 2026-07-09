import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, user, loading } = useAuth();

    // ⭐ Wait for auth to finish loading
    if (loading) {
        return <div style={{ padding: "2rem" }}>Loading...</div>;
    }

    // Not logged in → redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Role mismatch → redirect to correct dashboard
    if (role && user?.role !== role) {
        return user.role === "Manager"
            ? <Navigate to="/manager/dashboard" replace />
            : <Navigate to="/employee/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;

