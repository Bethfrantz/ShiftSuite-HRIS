import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
    getAllShifts,
    createShift,
    updateShift,
    deleteShift,
} from "../../services/shiftService";
import { getAllEmployees } from "../../services/employeeService";
import "../../styles/modules/scheduling.css";

export default function ManageShifts() {
    const { user } = useAuth();

    const [shifts, setShifts] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        date: "",
        startTime: "",
        endTime: "",
        position: "",
        employee: "",
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [positionFilter, setPositionFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    const filteredShifts = shifts.filter((shift) => {
        const matchesSearch =
            shift.position.toLowerCase().includes(search.toLowerCase()) ||
            shift.employee?.name.toLowerCase().includes(search.toLowerCase());

        const matchesPosition =
            positionFilter === "" || shift.position === positionFilter;

        const matchesDate =
            dateFilter === "" ||
            new Date(shift.date).toDateString() ===
            new Date(dateFilter).toDateString();

        return matchesSearch && matchesPosition && matchesDate;
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const shiftData = await getAllShifts();
            const employeeData = await getAllEmployees();

            setShifts(shiftData);
            setEmployees(employeeData);
        } catch (err) {
            console.error("Error loading shift data:", err);
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
                await updateShift(editingId, form);
            } else {
                await createShift(form);
            }

            setForm({
                date: "",
                startTime: "",
                endTime: "",
                position: "",
                employee: "",
            });

            setEditingId(null);
            loadData();
        } catch (err) {
            console.error("Error saving shift:", err);
        }

        setLoading(false);
    }

    function startEdit(shift) {
        setEditingId(shift._id);
        setForm({
            date: shift.date?.slice(0, 10),
            startTime: shift.startTime,
            endTime: shift.endTime,
            position: shift.position,
            employee: shift.employee?._id || "",
        });
    }

    async function handleDelete(id) {
        if (!confirm("Delete this shift?")) return;

        try {
            await deleteShift(id);
            loadData();
        } catch (err) {
            console.error("Error deleting shift:", err);
        }
    }

    return (
        <div className="manage-wrapper">
            <header className="manage-header">
                <h1 className="manage-title">Manage Shifts</h1>
                <p className="manage-subtitle">Logged in as: {user?.username}</p>
            </header>

            {/* ⭐ CREATE / EDIT FORM PANEL ⭐ */}
            <section className="panel form-panel">
                <h2>{editingId ? "Edit Shift" : "Create Shift"}</h2>

                <form className="shift-form" onSubmit={handleSubmit}>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="time"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="time"
                        name="endTime"
                        value={form.endTime}
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

                    <select
                        name="employee"
                        value={form.employee}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Assign Employee</option>
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>
                                {emp.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit" disabled={loading}>
                        {loading
                            ? "Saving..."
                            : editingId
                                ? "Update Shift"
                                : "Create Shift"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => {
                                setEditingId(null);
                                setForm({
                                    date: "",
                                    startTime: "",
                                    endTime: "",
                                    position: "",
                                    employee: "",
                                });
                            }}
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>
            </section>

            {/* ⭐ FILTER PANEL ⭐ */}
            <section className="panel filter-panel">
                <h2>Filters</h2>

                <div className="shift-filters">
                    <input
                        type="text"
                        placeholder="Search by employee or position..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={positionFilter}
                        onChange={(e) => setPositionFilter(e.target.value)}
                    >
                        <option value="">All Positions</option>
                        <option value="Cashier">Cashier</option>
                        <option value="Cook">Cook</option>
                        <option value="Manager">Manager</option>
                        <option value="Stock">Stock</option>
                    </select>

                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>
            </section>

            {/* ⭐ SHIFT TABLE ⭐ */}
            <section className="panel">
                <h2>Shift List</h2>

                <table className="shift-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Times</th>
                            <th>Position</th>
                            <th>Employee</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredShifts.map((shift) => (
                            <tr key={shift._id}>
                                <td>{shift.date?.slice(0, 10)}</td>
                                <td>
                                    {shift.startTime} - {shift.endTime}
                                </td>
                                <td>{shift.position}</td>
                                <td>{shift.employee?.name || "Unassigned"}</td>
                                <td className="actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => startEdit(shift)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(shift._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
