import "../styles/layout/ErrorState.css";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorState({ title = "Something went wrong", message = "" }) {
    return (
        <div className="error-state">
            <FaExclamationTriangle className="error-state-icon" />
            <h4 className="error-state-title">{title}</h4>
            {message && <p className="error-state-message">{message}</p>}
        </div>
    );
}
