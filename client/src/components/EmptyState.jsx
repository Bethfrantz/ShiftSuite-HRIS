import "../styles/layout/EmptyState.css";
import { FaInbox } from "react-icons/fa";

export default function EmptyState({ title = "No data available", message = "" }) {
    return (
        <div className="empty-state">
            <FaInbox className="empty-state-icon" />
            <h4 className="empty-state-title">{title}</h4>
            {message && <p className="empty-state-message">{message}</p>}
        </div>
    );
}
