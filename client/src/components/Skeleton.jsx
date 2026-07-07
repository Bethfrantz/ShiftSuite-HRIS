import "../styles/layout/Skeleton.css";

export default function Skeleton({ width = "100%", height = "16px", radius = "var(--radius-sm)" }) {
    return (
        <div
            className="skeleton"
            style={{
                width,
                height,
                borderRadius: radius
            }}
        />
    );
}
