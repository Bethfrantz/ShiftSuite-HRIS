import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import Toast from "./Toast";
import {
    getDashboardStats,
    getRecentShifts,
    getSnapshot,
} from "../services/api";
import "../styles/layout/ManagerOver.css";

export default function ManagerOver() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState(null);

    const [stats, setStats] = useState(null);
    const [recentShifts, setRecentShifts] = useState([]);
    const [snapshot, setSnapshot] = useState("");

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const statsRes = await getDashboardStats();
            const shiftsRes = await getRecentShifts();
            const snapshotRes = await getSnapshot();

            if (statsRes.error || shiftsRes.error || snapshotRes.error) {
                setError("Unable to load dashboard data.");
                setToast("Some data failed to load.");
                setLoading(false);
                return;
            }

            setStats(statsRes);
            setRecentShifts(shiftsRes);
            setSnapshot(snapshotRes.snapshot);

            setLoading(false);
        }

        loadData();
    }, []);

    return (
        <div className="manager-overview">

            {toast && <Toast message={toast} type="error" />}

            <div className="manager-overview-header">
                <h2 className="manager-overview-title">Manager Overview</h2>
                <p className="manager-overview-subtitle">
                    High-level snapshot of your team and schedule.
                </p>
            </div>

            {error && (
                <ErrorState
                    title="Unable to load dashboard"
                    message="Please refresh the page or try again later."
                />
            )}

            {!error && (
                <>
                    {/* METRICS GRID */}
                    <div className="metrics-grid">
                        {loading ? (
                            <>
                                <div className="metric-card">
                                    <Skeleton width="60%" height="20px" />
                                    <Skeleton width="40%" height="28px" />
                                </div>
                                <div className="metric-card">
                                    <Skeleton width="60%" height="20px" />
                                    <Skeleton width="40%" height="28px" />
                                </div>
                                <div className="metric-card">
                                    <Skeleton width="60%" height="20px" />
                                    <Skeleton width="40%" height="28px" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="metric-card">
                                    <span className="metric-title">Total Employees</span>
                                    <span className="metric-value">{stats.totalEmployees}</span>
                                </div>

                                <div className="metric-card">
                                    <span className="metric-title">Total Shifts</span>
                                    <span className="metric-value">{stats.totalShifts}</span>
                                </div>

                                <div className="metric-card">
                                    <span className="metric-title">Upcoming Shifts</span>
                                    <span className="metric-value">{stats.upcomingShifts}</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* TODAY'S SNAPSHOT */}
                    <div className="snapshot-card">
                        <h3 className="snapshot-title">Today's Snapshot</h3>

                        {loading ? (
                            <Skeleton width="50%" height="20px" />
                        ) : snapshot ? (
                            <p className="snapshot-text">{snapshot}</p>
                        ) : (
                            <EmptyState
                                title="No scheduled shifts today"
                                message="Everyone is off today — enjoy the quiet!"
                            />
                        )}
                    </div>

                    {/* RECENT SHIFTS */}
                    <div className="recent-shifts-card">
                        <h3 className="recent-shifts-title">Recent Shifts</h3>

                        {loading ? (
                            <>
                                <Skeleton height="20px" />
                                <Skeleton height="20px" />
                                <Skeleton height="20px" />
                            </>
                        ) : recentShifts.length === 0 ? (
                            <EmptyState
                                title="No recent shifts"
                                message="Shifts will appear here once employees start working."
                            />
                        ) : (
                            <table className="recent-shifts-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Employee</th>
                                        <th>Position</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentShifts.map((shift, index) => (
                                        <tr key={index}>
                                            <td>{shift.date}</td>
                                            <td>{shift.employee}</td>
                                            <td>{shift.position}</td>
                                            <td>{shift.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

