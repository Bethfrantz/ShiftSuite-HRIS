// src/hooks/useTheme.js
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function useTheme() {
    return useContext(ThemeContext);
}
