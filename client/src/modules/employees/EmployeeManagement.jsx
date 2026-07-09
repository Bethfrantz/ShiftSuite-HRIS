import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from "../../services/employeeService";
import "../../styles/modules/employees.css";

export default function ManageEmployees() {
    const { user } = useAuth();

    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        position: "",
        password: "",
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // ⭐ SAFETY GUARD — prevents crashes if API returns non-array
    const safeEmployees = Array.isArray(employees) ? employees : [];

    useEffect(() => {
        loadEmployees();
    }, []);

    async function loadEmployees() {
        try {
            const data = await getAllEmployees();

            // ⭐ If API returns { employees: [...] }
            if (Array.isArray(data)) {
                setEmployees(data);
            } else if (Array.isArray(data?.employees)) {
                setEmployees(data.employees);
            } else {
                setEmployees([]); // prevent crashes
            }
        } catch (err) {
            console.error("Error loading employees:", err);
            setEmployees([]); // prevent render crash
        }
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingId) {
                await updateEmployee(editingId, form);
            } else {
                await createEmployee(form);
            }

            setForm({ name: "", email: "", position: "", password: "" });
            setEditingId(null);
            loadEmployees();
        } catch (err) {
            console.error("Error saving employee:", err);
        }

        setLoading(false);
    }

    function startEdit(emp) {
        setEditingId(emp._id);
        setForm({
            name: emp.name || "",
            email: emp.email || "",
            position: emp.position || "",
            password: "",
        });
    }

    async function handleDelete(id) {
        if (!confirm("Are you sure you want to delete this employee?")) return;

        try {
            await deleteEmployee(id);
            loadEmployees();
        } catch (err) {
            console.error("Error deleting employee:", err);
        }
    }

    return (
        <div className="page-container">
            <h1>Manage Employees</h1>
            <p>Logged in as: {user?.username}</p>

            {/* FORM */}
            <form className="employee-form" onSubmit={handleSubmit}>
                <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="position"
                    placeholder="Position"
                    value={form.position}
                    onChange={handleChange}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder={editingId ? "New Password (optional)" : "Password"}
                    value={form.password}
                    onChange={handleChange}
                    required={!editingId}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : editingId ? "Update Employee" : "Add Employee"}
                </button>

                {editingId && (
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                            setEditingId(null);
                            setForm({ name: "", email: "", position: "", password: "" });
                        }}
                    >
                        Cancel Edit
                    </button>
                )}
            </form>

            {/* EMPLOYEE LIST */}
            <h2>Employee List</h2>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {safeEmployees.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp.name || ""}</td>
                            <td>{emp.email || ""}</td>
                            <td>{emp.position || ""}</td>
                            <td>
                                <button onClick={() => startEdit(emp)}>Edit</button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(emp._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
