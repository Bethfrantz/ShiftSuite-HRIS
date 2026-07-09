import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./modules/auth/Login";
import Register from "./modules/auth/Register";

import ManagerDashboard from "./modules/dashboard/ManagerDashboard";
import EmployeeDashboard from "./modules/dashboard/EmployeeDashboard";

import EmployeeManagement from "./modules/employees/EmployeeManagement";
import EmployeeProfile from "./modules/employees/EmployeeProfile";

import ManageShifts from "./modules/scheduling/ManageShifts";
import ShiftCreate from "./modules/scheduling/ShiftCreate";
import EditShift from "./modules/scheduling/EditShift";
import EmployeeCalendarPage from "./modules/scheduling/EmployeeCalendarPage";

import ProfileSettings from "./modules/profile/ProfileSettings";

import DashboardLayout from "./components/DashboardLayout";
import { useAuth } from "./context/AuthContext";

/* Consolidated CSS */
import "./styles/base/index.css";
import "./styles/base/variables.css";
import "./styles/base/layout.css";
import "./styles/base/components.css";
import "./styles/base/forms.css";
import "./styles/base/tables.css";
import "./styles/base/calendar.css";

import "./styles/layout/DashboardLayout.css";
import "./styles/layout/TopNav.css";

import "./styles/modules/auth.css";
import "./styles/modules/dashboard.css";
import "./styles/modules/employees.css";
import "./styles/modules/scheduling.css";
import "./styles/modules/profile.css";


function App() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* ROOT REDIRECT */}
      <Route index element={<Navigate to="/login" />} />


      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* MANAGER ROUTES */}
      <Route
        path="/manager/dashboard"
        element={
          <ProtectedRoute role="Manager">
            <DashboardLayout role="Manager">
              <ManagerDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/employees"
        element={
          <ProtectedRoute role="Manager">
            <DashboardLayout role="Manager">
              <EmployeeManagement />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/shifts"
        element={
          <ProtectedRoute role="Manager">
            <DashboardLayout role="Manager">
              <ManageShifts />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/shifts/create"
        element={
          <ProtectedRoute role="Manager">
            <DashboardLayout role="Manager">
              <ShiftCreate />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager/shifts/edit/:id"
        element={
          <ProtectedRoute role="Manager">
            <DashboardLayout role="Manager">
              <EditShift />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* EMPLOYEE ROUTES */}
      <Route
        path="/employee/dashboard"
        element={
          <ProtectedRoute role="Employee">
            <DashboardLayout role="Employee">
              <EmployeeDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee/calendar"
        element={
          <ProtectedRoute role="Employee">
            <DashboardLayout role="Employee">
              <EmployeeCalendarPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* PROFILE (shared) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout role={user?.role}>
              <EmployeeProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout role={user?.role}>
              <ProfileSettings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;

