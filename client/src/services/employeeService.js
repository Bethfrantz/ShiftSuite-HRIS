import api from "./api";

export async function getAllEmployees() {
    const res = await api.get("/api/users");
    return res.data;
}

export async function createEmployee(data) {
    const res = await api.post("/api/users", data);
    return res.data;
}

export async function updateEmployee(id, data) {
    const res = await api.put(`/api/users/${id}`, data);
    return res.data;
}

export async function deleteEmployee(id) {
    const res = await api.delete(`/api/users/${id}`);
    return res.data;
}

