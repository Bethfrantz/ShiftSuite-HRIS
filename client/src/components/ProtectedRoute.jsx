import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, user } = useAuth();

    // Not logged in → redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If a role is required (Manager or Employee)
    if (role && user?.role !== role) {
        // Redirect based on their actual role
        return user.role === "Manager"
            ? <Navigate to="/manager/dashboard" replace />
            : <Navigate to="/employee/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
