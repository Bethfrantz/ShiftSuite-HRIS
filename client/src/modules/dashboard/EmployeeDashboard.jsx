import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyShifts } from "../../services/shiftService";
import "../../styles/modules/dashboard.css";

export default function EmployeeDashboard() {
    const { user } = useAuth();

    const [stats, setStats] = useState({
        totalAssigned: 0,
        upcoming: 0,
    });

    const [upcomingShifts, setUpcomingShifts] = useState([]);
    const [recentShifts, setRecentShifts] = useState([]);

    useEffect(() => {
        async function load() {
            const res = await getMyShifts();
            const shifts = res.shifts || [];

            const upcoming = shifts.filter(
                (s) => new Date(s.date) >= new Date()
            );

            const recent = shifts
                .filter((s) => new Date(s.date) < new Date())
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5);

            setStats({
                totalAssigned: shifts.length,
                upcoming: upcoming.length,
            });

            setUpcomingShifts(upcoming);
            setRecentShifts(recent);
        }

        load();
    }, []);

    return (
        <div className="employee-wrapper">
            <header className="employee-header">
                <h1 className="employee-title">Employee Dashboard</h1>
                <p className="employee-subtitle">
                    Welcome back, {user?.name}. Here’s your schedule overview.
                </p>
            </header>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Assigned Shifts</h3>
                    <p className="stat-number">{stats.totalAssigned}</p>
                </div>

                <div className="stat-card">
                    <h3>Upcoming Shifts</h3>
                    <p className="stat-number">{stats.upcoming}</p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="employee-grid">
                {/* Upcoming Shifts */}
                <section className="panel">
                    <h2>Upcoming Shifts</h2>

                    {upcomingShifts.length === 0 ? (
                        <p>No upcoming shifts.</p>
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
                                {upcomingShifts.map((shift) => (
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
                </section>

                {/* Recent Shifts */}
                <section className="panel">
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
                </section>

                {/* Quick Actions */}
                <section className="panel">
                    <h2>Quick Actions</h2>

                    <div className="quick-actions">
                        <a
                            tabIndex={1}
                            href="/employee/calendar"
                            className="action-btn"
                        >
                            View Weekly Calendar
                        </a>

                        <a
                            tabIndex={2}
                            href="/profile"
                            className="action-btn secondary"
                        >
                            View Profile
                        </a>

                        <a
                            tabIndex={3}
                            href="/employee/dashboard"
                            className="action-btn"
                        >
                            Refresh Dashboard
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
