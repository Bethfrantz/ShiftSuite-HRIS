import { useState, useEffect } from "react";
import { createShift } from "../../services/shiftService";
import { getAllEmployees } from "../../services/employeeService";
import "../../styles/modules/scheduling.css";

export default function ShiftCreate() {
    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        date: "",
        startTime: "",
        endTime: "",
        position: "",
        employee: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            const employeeData = await getAllEmployees();
            setEmployees(employeeData);
        }
        load();
    }, []);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await createShift(form);

            alert("Shift created successfully!");

            setForm({
                date: "",
                startTime: "",
                endTime: "",
                position: "",
                employee: "",
            });
        } catch (err) {
            console.error("Error creating shift:", err);
            alert("Error creating shift.");
        }

        setLoading(false);
    }

    return (
        <div className="shiftcreate-wrapper">
            <div className="shiftcreate-card">
                <h1 className="shiftcreate-title">Create New Shift</h1>
                <p className="shiftcreate-subtitle">
                    Fill out the details below to add a new shift.
                </p>

                <form className="shiftcreate-form" onSubmit={handleSubmit}>
                    <input
                        tabIndex={1}
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                    />

                    <input
                        tabIndex={2}
                        type="time"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        required
                    />

                    <input
                        tabIndex={3}
                        type="time"
                        name="endTime"
                        value={form.endTime}
                        onChange={handleChange}
                        required
                    />

                    <input
                        tabIndex={4}
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={form.position}
                        onChange={handleChange}
                        required
                    />

                    <select
                        tabIndex={5}
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

                    <button tabIndex={6} type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Shift"}
                    </button>
                </form>
            </div>
        </div>
    );
}
