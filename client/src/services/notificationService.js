import api from "./api";

export async function getNotifications() {
    const res = await api.get("/api/notifications");
    return res.data;
}

export async function markNotificationRead(id) {
    const res = await api.put(`/api/notifications/${id}/read`);
    return res.data;
}
