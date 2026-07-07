// src/hooks/useNotifications.js
import { useState, useEffect } from "react";
import api from "../services/api";

export default function useNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        const res = await api.get("/notifications");
        setNotifications(res.data.notifications || []);
        setLoading(false);
    }

    async function markAsRead(id) {
        await api.put(`/notifications/${id}/read`);
        load();
    }

    useEffect(() => {
        load();
    }, []);

    return {
        notifications,
        loading,
        markAsRead,
        reloadNotifications: load,
    };
}
