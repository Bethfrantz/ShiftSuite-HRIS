import { useState, useEffect } from "react";
import api from "../services/api";

export default function useFetch(url, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                setLoading(true);
                const res = await api.get(url);
                if (mounted) setData(res.data);
            } catch (err) {
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => (mounted = false);
    }, deps);

    return { data, loading, error };
}
