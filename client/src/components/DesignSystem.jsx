export default function DesignSystem() {
    return (
        <div className="design-wrapper">
            <h1 className="page-title">ShiftSuite Design System</h1>
            <p className="page-subtitle">Unified HRIS UI Framework</p>

            <section className="card">
                <h2 className="card-header">Colors</h2>
                <div className="color-grid">
                    <div className="color-swatch" style={{ background: "var(--brand-primary)" }}>Primary</div>
                    <div className="color-swatch" style={{ background: "var(--brand-secondary)" }}>Secondary</div>
                    <div className="color-swatch" style={{ background: "var(--neutral-100)" }}>Neutral</div>
                </div>
            </section>

            <section className="card">
                <h2 className="card-header">Buttons</h2>
                <div className="row">
                    <button className="btn btn-primary">Primary</button>
                    <button className="btn btn-secondary">Secondary</button>
                    <button className="btn btn-danger">Danger</button>
                </div>
            </section>

            <section className="card">
                <h2 className="card-header">Forms</h2>
                <input className="form-input" placeholder="Input example" />
                <select className="form-select">
                    <option>Option</option>
                </select>
            </section>

            <section className="card">
                <h2 className="card-header">Animations</h2>
                <div className="panel fade-in">Fade In</div>
                <div className="panel slide-in">Slide In</div>
                <div className="panel scale-in">Scale In</div>
            </section>
        </div>
    );
}
