import { useEffect, useState } from "react";
import { getAllShifts } from "../../services/shiftService";
import { getAllEmployees } from "../../services/employeeService";
import { getNotifications } from "../../services/notificationService";

import "../../styles/modules/dashboard.css";

/* -------------------------
   Subcomponents
-------------------------- */

function KpiSummary({ stats }) {
    return (
        <div className="panel kpi-grid">
            <div className="stat-card">
                <h3>Total Employees</h3>
                <p className="stat-number">{stats.totalEmployees}</p>
            </div>

            <div className="stat-card">
                <h3>Total Shifts</h3>
                <p className="stat-number">{stats.totalShifts}</p>
            </div>

            <div className="stat-card">
                <h3>Upcoming Shifts</h3>
                <p className="stat-number">{stats.upcomingShifts}</p>
            </div>
        </div>
    );
}

function TodaySnapshot({ shifts }) {
    return (
        <div className="panel">
            <h2>Today’s Snapshot</h2>

            {shifts.length === 0 ? (
                <p>No one scheduled today.</p>
            ) : (
                <ul className="snapshot-list">
                    {shifts.map((s) => (
                        <li key={s._id}>
                            {s.employee?.name || "Unassigned"} • {s.position} •{" "}
                            {s.startTime}–{s.endTime}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function RecentShiftsPanel({ shifts }) {
    return (
        <div className="panel">
            <h2>Recent Shifts</h2>

            {shifts.length === 0 ? (
                <p>No shifts yet.</p>
            ) : (
                <table className="shift-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Employee</th>
                            <th>Position</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shifts.map((shift) => (
                            <tr key={shift._id}>
                                <td>{new Date(shift.date).toLocaleDateString()}</td>
                                <td>{shift.employee?.name || "Unassigned"}</td>
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
    );
}

function CoverageAlerts({ alerts }) {
    return (
        <div className="panel">
            <h2>Coverage & Alerts</h2>
            <ul className="alerts-list">
                {alerts.map((a) => (
                    <li key={a.label}>
                        <strong>{a.label}:</strong> {a.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function MiniScheduleCalendar({ shifts }) {
    return (
        <div className="panel">
            <h2>Schedule Calendar</h2>
            <ul className="calendar-list">
                {shifts.slice(0, 7).map((s) => (
                    <li key={s._id}>
                        {new Date(s.date).toLocaleDateString()} •{" "}
                        {s.employee?.name || "Unassigned"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function RecentActivityFeed({ notifications }) {
    return (
        <div className="panel">
            <h2>Recent Activity</h2>
            <ul className="activity-list">
                {notifications.map((n) => (
                    <li key={n._id}>
                        {n.message} •{" "}
                        {new Date(n.createdAt).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ManagerQuickActions() {
    return (
        <div className="panel">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
                <a href="/manager/employees" className="action-btn">
                    Manage Employees
                </a>
                <a href="/manager/shifts" className="action-btn secondary">
                    Manage Shifts
                </a>
                <a href="/manager/shifts/create" className="action-btn">
                    Create Shift
                </a>
            </div>
        </div>
    );
}

/* -------------------------
   Main Dashboard Component
-------------------------- */

export default function ManagerDashboard() {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalShifts: 0,
        upcomingShifts: 0,
    });

    const [recentShifts, setRecentShifts] = useState([]);
    const [todaysShifts, setTodaysShifts] = useState([]);
    const [coverageAlerts, setCoverageAlerts] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function load() {
            const [employeesRes, shiftsRes, notificationsRes] = await Promise.all([
                getAllEmployees(),
                getAllShifts(),
                getNotifications(),
            ]);

            const employees = employeesRes.employees || [];
            const shifts = shiftsRes.shifts || [];

            const upcoming = shifts.filter(
                (s) => new Date(s.date) >= new Date()
            );

            const today = new Date().toISOString().slice(0, 10);
            const todays = shifts.filter((s) => s.date === today);

            const unassigned = shifts.filter((s) => !s.employee);
            const overlapping = []; // future enhancement

            setStats({
                totalEmployees: employees.length,
                totalShifts: shifts.length,
                upcomingShifts: upcoming.length,
            });

            setRecentShifts(
                shifts
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
            );

            setTodaysShifts(todays);

            setCoverageAlerts([
                { label: "Unassigned Shifts", value: unassigned.length },
                { label: "Overlapping Shifts", value: overlapping.length },
            ]);

            setNotifications(notificationsRes.slice(0, 5));
        }

        load();
    }, []);

    return (
        <div className="manager-wrapper">
            <header className="manager-header">
                <h1 className="manager-title">Manager Overview</h1>
                <p className="manager-subtitle">
                    High-level snapshot of your team and schedule.
                </p>
            </header>

            {/* TOP ROW */}
            <div className="dashboard-row">
                <KpiSummary stats={stats} />
                <TodaySnapshot shifts={todaysShifts} />
            </div>

            {/* MIDDLE ROW */}
            <div className="dashboard-row">
                <RecentShiftsPanel shifts={recentShifts} />
                <CoverageAlerts alerts={coverageAlerts} />
            </div>

            {/* BOTTOM ROW */}
            <div className="dashboard-row">
                <MiniScheduleCalendar shifts={recentShifts} />
                <RecentActivityFeed notifications={notifications} />
            </div>

            {/* QUICK ACTIONS */}
            <ManagerQuickActions />
        </div>
    );
}
