import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getMyShifts } from "../../services/shiftService";
import "../../styles/modules/employees.css";

export default function EmployeeProfile() {
    const { user } = useAuth();
    const [upcomingShift, setUpcomingShift] = useState(null);
    const [recentShifts, setRecentShifts] = useState([]);

    useEffect(() => {
        async function load() {
            const res = await getMyShifts();
            const shifts = res.shifts || [];

            const upcoming = shifts
                .filter((s) => new Date(s.date) >= new Date())
                .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

            const recent = shifts
                .filter((s) => new Date(s.date) < new Date())
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5);

            setUpcomingShift(upcoming);
            setRecentShifts(recent);
        }

        load();
    }, []);

    return (
        <div className="profile-wrapper">
            <header className="profile-header">
                <h1 className="profile-title">My Profile</h1>
                <p className="profile-subtitle">
                    Personal details and schedule overview
                </p>
            </header>

            {/* Profile Card */}
            <div className="profile-card">
                <h2>Account Information</h2>

                <div className="profile-info">
                    <div>
                        <label>Name</label>
                        <p>{user?.name}</p>
                    </div>

                    <div>
                        <label>Email</label>
                        <p>{user?.email}</p>
                    </div>

                    <div>
                        <label>Role</label>
                        <p>{user?.role}</p>
                    </div>

                    <div>
                        <label>Position</label>
                        <p>{user?.position}</p>
                    </div>
                </div>

                <div className="profile-actions">
                    <a tabIndex={1} href="/employee/edit-profile" className="action-btn">
                        Edit Profile
                    </a>
                    <a tabIndex={2} href="/employee/change-password" className="action-btn secondary">
                        Change Password
                    </a>
                </div>
            </div>

            {/* Upcoming Shift */}
            <div className="profile-section">
                <h2>Upcoming Shift</h2>

                {upcomingShift ? (
                    <div className="shift-card">
                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(upcomingShift.date).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Position:</strong> {upcomingShift.position}
                        </p>
                        <p>
                            <strong>Time:</strong>{" "}
                            {upcomingShift.startTime}–{upcomingShift.endTime}
                        </p>
                    </div>
                ) : (
                    <p>No upcoming shifts.</p>
                )}
            </div>

            {/* Recent Shifts */}
            <div className="profile-section">
                <h2>Recent Shifts</h2>

                {recentShifts.length === 0 ? (
                    <p>No recent shifts.</p>
                ) : (
                    <table className="shift-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Position</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentShifts.map((shift) => (
                                <tr key={shift._id}>
                                    <td>
                                        {new Date(shift.date).toLocaleDateString()}
                                    </td>
                                    <td>{shift.position}</td>
                                    <td>
                                        {shift.startTime}–{shift.endTime}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
