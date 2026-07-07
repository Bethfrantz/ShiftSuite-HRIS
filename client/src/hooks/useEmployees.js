// src/hooks/useEmployees.js
import { useState, useEffect } from "react";
import { getAllEmployees } from "../services/employeeService";

export default function useEmployees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        const data = await getAllEmployees();
        setEmployees(data);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    return { employees, loading, reloadEmployees: load };
}
