// src/hooks/useShifts.js
import { useState, useEffect } from "react";
import {
    getAllShifts,
    createShift,
    updateShift,
    deleteShift,
} from "../services/shiftService";

export default function useShifts() {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        const data = await getAllShifts();
        setShifts(data);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    async function addShift(form) {
        await createShift(form);
        load();
    }

    async function editShift(id, form) {
        await updateShift(id, form);
        load();
    }

    async function removeShift(id) {
        await deleteShift(id);
        load();
    }

    return {
        shifts,
        loading,
        addShift,
        editShift,
        removeShift,
        reloadShifts: load,
    };
}
