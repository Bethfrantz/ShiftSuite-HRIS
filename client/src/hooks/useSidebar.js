// src/hooks/useSidebar.js
import { useState } from "react";

export default function useSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    function toggleCollapsed() {
        setCollapsed((prev) => !prev);
    }

    function toggleMobile() {
        setMobileOpen((prev) => !prev);
    }

    return {
        collapsed,
        mobileOpen,
        toggleCollapsed,
        toggleMobile,
    };
}
