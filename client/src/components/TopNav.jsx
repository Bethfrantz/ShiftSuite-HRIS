import { useAuth } from "../context/AuthContext";
import "../styles/layout/TopNav.css";
import { FaBars, FaMoon, FaSun, FaBell } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function TopNav({ onMobileMenu, unreadCount = 0 }) {
    const { user, logout } = useAuth();
    const [darkMode, setDarkMode] = useState(false);

    // Apply theme to <html>
    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    return (
        <header className="topnav-wrapper">

            {/* ROW 1 */}
            <nav className="topnav-main">

                {/* Mobile Menu Button */}
                <button className="topnav-menu-btn" onClick={onMobileMenu}>
                    <FaBars size={20} />
                </button>

                {/* Logo */}
                <span className="topnav-logo">ShiftSuite</span>

                {/* Main Links */}
                <div className="topnav-links">
                    <a href="/manager/dashboard" className="topnav-link">Dashboard</a>
                    <a href="/manager/employees" className="topnav-link">Employees</a>
                    <a href="/manager/shifts" className="topnav-link">Shifts</a>
                    <a href="/profile" className="topnav-link">Profile</a>
                </div>

                {/* Notification Bell */}
                <button className="topnav-bell-btn">
                    <div className="bell-wrapper">
                        <FaBell size={20} />
                        {unreadCount > 0 && <span className="bell-dot"></span>}
                    </div>
                </button>

                {/* Dark Mode Toggle */}
                <button
                    className="darkmode-btn"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>

            </nav>

            {/* ROW 2 */}
            <div className="topnav-userbar">
                <span className="welcome-text">Welcome, {user?.name}</span>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>

        </header>
    );
}

