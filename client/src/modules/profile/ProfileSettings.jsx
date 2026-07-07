import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateEmployee } from "../../services/employeeService";
import "../../styles/modules/profile.css";

export default function ProfileSettings() {
    const { user, logout } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        position: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                email: user.email || "",
                position: user.position || "",
                password: "",
            });
        }
    }, [user]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setSuccess("");

        try {
            const updated = await updateEmployee(user._id, form);

            setSuccess("Profile updated successfully!");

            // Update localStorage user
            localStorage.setItem("user", JSON.stringify(updated));
        } catch (err) {
            console.error("Profile update error:", err);
        }

        setLoading(false);
    }

    return (
        <div className="page-container">
            <h1>Profile Settings</h1>

            <form className="profile-form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <label>Email</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label>Position</label>
                <input
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    required
                />

                <label>New Password (optional)</label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                </button>

                {success && <p className="success">{success}</p>}
            </form>

            <button className="logout-btn" onClick={logout}>
                Logout
            </button>
        </div>
    );
}
