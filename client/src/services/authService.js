import api from "./api";

export async function loginUser(credentials) {
    const res = await api.post("/login", credentials);
    return res.data;
}

export async function registerUser(data) {
    const res = await api.post("/register", data);
    return res.data;
}
