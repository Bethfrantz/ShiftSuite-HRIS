import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TopNav from "./TopNav";
import Tooltip from "./Tooltip";
import "../styles/layout/DashboardLayout.css";

import {
    FaChevronLeft,
    FaChevronRight,
    FaHome,
    FaUsers,
    FaClipboardList,
    FaCalendarAlt,
    FaUserCircle
} from "react-icons/fa";

export default function DashboardLayout({ children, role }) {
    const { user } = useAuth();

    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSidebar = () => setCollapsed(!collapsed);
    const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

    return (
        <div className="page-wrapper">

            {/* TOP NAV */}
            <TopNav
                onMobileMenu={toggleMobileSidebar}
                unreadCount={3} // Replace with real notifications count
            />

            {/* BODY */}
            <div className="layout-body">

                {/* SIDEBAR */}
                <aside
                    className={`sidebar 
                        ${collapsed ? "collapsed" : ""} 
                        ${mobileOpen ? "open" : ""}`}
                >
                    <div className="sidebar-header">
                        <button className="sidebar-collapse-btn" onClick={toggleSidebar}>
                            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
                        </button>
                    </div>

                    <nav className="sidebar-nav">

                        {/* MANAGER ROUTES */}
                        {role === "Manager" && (
                            <>
                                <NavLink
                                    to="/manager/dashboard"
                                    className={({ isActive }) =>
                                        isActive ? "sidebar-link active" : "sidebar-link"
                                    }
                                >
                                    <FaHome className="sidebar-icon" />
                                    {!collapsed && <span>Dashboard</span>}
                                    {collapsed && <Tooltip text="Dashboard" />}
                                </NavLink>

                                <NavLink
                                    to="/manager/employees"
                                    className={({ isActive }) =>
                                        isActive ? "sidebar-link active" : "sidebar-link"
                                    }
                                >
                                    <FaUsers className="sidebar-icon" />
                                    {!collapsed && <span>Employees</span>}
                                    {collapsed && <Tooltip text="Employees" />}
                                </NavLink>

                                <NavLink
                                    to="/manager/shifts"
                                    className={({ isActive }) =>
                                        isActive ? "sidebar-link active" : "sidebar-link"
                                    }
                                >
                                    <FaClipboardList className="sidebar-icon" />
                                    {!collapsed && <span>Shifts</span>}
                                    {collapsed && <Tooltip text="Shifts" />}
                                </NavLink>
                            </>
                        )}

                        {/* EMPLOYEE ROUTES */}
                        {role === "Employee" && (
                            <>
                                <NavLink
                                    to="/employee/dashboard"
                                    className={({ isActive }) =>
                                        isActive ? "sidebar-link active" : "sidebar-link"
                                    }
                                >
                                    <FaHome className="sidebar-icon" />
                                    {!collapsed && <span>Dashboard</span>}
                                    {collapsed && <Tooltip text="Dashboard" />}
                                </NavLink>

                                <NavLink
                                    to="/employee/calendar"
                                    className={({ isActive }) =>
                                        isActive ? "sidebar-link active" : "sidebar-link"
                                    }
                                >
                                    <FaCalendarAlt className="sidebar-icon" />
                                    {!collapsed && <span>My Schedule</span>}
                                    {collapsed && <Tooltip text="My Schedule" />}
                                </NavLink>
                            </>
                        )}

                        {/* PROFILE ROUTE */}
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? "sidebar-link active" : "sidebar-link"
                            }
                        >
                            <FaUserCircle className="sidebar-icon" />
                            {!collapsed && <span>Profile</span>}
                            {collapsed && <Tooltip text="Profile" />}
                        </NavLink>
                    </nav>
                </aside>

                {/* MAIN CONTENT */}
                <main className="layout-content">
                    {children}
                </main>

            </div>
        </div>
    );
}


