import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { registerUser } from "../../services/api";
import "../../styles/modules/auth.css"; // <-- Add this stylesheet

const Register = () => {
    const { login } = useAuth();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "Employee",
        position: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await registerUser(form);
            login(response.data);
        } catch (err) {
            alert("Registration failed. Check your inputs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                <h2 className="register-title">Create Account</h2>
                <p className="register-subtitle">Join the scheduling system</p>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            tabIndex={1}
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            tabIndex={2}
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="password-wrapper">
                            <input
                                tabIndex={3}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                tabIndex={4}
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <select
                            tabIndex={5}
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="Manager">Manager</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Position</label>
                        <input
                            tabIndex={6}
                            type="text"
                            name="position"
                            value={form.position}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        tabIndex={7}
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
