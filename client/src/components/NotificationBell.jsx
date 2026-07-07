import { useEffect, useState } from "react";
import { getNotifications, markNotificationRead } from "../services/notificationService";

export default function NotificationBell() {
    const [notes, setNotes] = useState([]);
    const [open, setOpen] = useState(false);

    async function load() {
        const data = await getNotifications();
        setNotes(data);
    }

    useEffect(() => {
        load();

        // Poll every 30 seconds
        const interval = setInterval(load, 30000);
        return () => clearInterval(interval);
    }, []);

    async function markRead(id) {
        await markNotificationRead(id);
        load();
    }

    return (
        <div className="notif-wrapper">
            <button className="notif-bell" onClick={() => setOpen(!open)}>
                🔔
                {notes.filter((n) => !n.read).length > 0 && (
                    <span className="notif-count">
                        {notes.filter((n) => !n.read).length}
                    </span>
                )}
            </button>

            {open && (
                <div className="notif-dropdown">
                    {notes.length === 0 ? (
                        <p>No notifications</p>
                    ) : (
                        notes.map((n) => (
                            <div key={n._id} className={`notif-item ${n.read ? "read" : ""}`}>
                                <p>{n.message}</p>
                                {!n.read && (
                                    <button onClick={() => markRead(n._id)}>Mark read</button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
