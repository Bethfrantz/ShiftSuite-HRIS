import api from "./api";

export async function getAllShifts() {
    const res = await api.get("/api/shifts");
    return res.data;
}

export async function createShift(data) {
    const res = await api.post("/api/shifts", data);
    return res.data;
}

export async function updateShift(id, data) {
    const res = await api.put(`/api/shifts/${id}`, data);
    return res.data;
}

export async function deleteShift(id) {
    const res = await api.delete(`/api/shifts/${id}`);
    return res.data;
}

export async function getMyShifts() {
    const res = await api.get("/api/shifts/my");
    return res.data;
}

export async function getShiftById(id) {
    const res = await api.get(`/api/shifts/${id}`);
    return res.data;
}

