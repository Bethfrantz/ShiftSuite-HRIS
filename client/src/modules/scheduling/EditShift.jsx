import { useState, useEffect } from "react";
import { updateShift, getShiftById } from "../../services/shiftService";
import { getAllEmployees } from "../../services/employeeService";
import "../../styles/modules/scheduling.css";

export default function EditShift({ shiftId }) {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        date: "",
        startTime: "",
        endTime: "",
        position: "",
        employee: "",
    });

    useEffect(() => {
        async function load() {
            const shift = await getShiftById(shiftId);
            const employeeData = await getAllEmployees();

            setEmployees(employeeData);

            setForm({
                date: shift.date?.slice(0, 10),
                startTime: shift.startTime,
                endTime: shift.endTime,
                position: shift.position,
                employee: shift.employee?._id || "",
            });
        }

        load();
    }, [shiftId]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await updateShift(shiftId, form);
            alert("Shift updated successfully!");
        } catch (err) {
            console.error("Error updating shift:", err);
            alert("Error updating shift.");
        }

        setLoading(false);
    }

    return (
        <div className="editshift-wrapper">
            <div className="editshift-card">
                <h1 className="editshift-title">Edit Shift</h1>
                <p className="editshift-subtitle">
                    Update the details below and save your changes.
                </p>

                <form className="editshift-form" onSubmit={handleSubmit}>
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
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}
