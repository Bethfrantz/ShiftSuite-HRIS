import "../styles/layout/Toast.css";

export default function Toast({ message, type = "error" }) {
    return <div className={`toast toast-${type}`}>{message}</div>;
}
