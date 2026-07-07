import WeeklyCalendar from "../../components/WeeklyCalendar";
import "../../styles/modules/scheduling.css"; // You will merge this into scheduling.css

export default function EmployeeCalendarPage() {
    return (
        <div className="employee-calendar-wrapper">
            <header className="employee-calendar-header">
                <h1 className="employee-calendar-title">My Weekly Schedule</h1>
                <p className="employee-calendar-subtitle">
                    View your assigned shifts for the week.
                </p>
            </header>

            <div className="calendar-container">
                <WeeklyCalendar />
            </div>
        </div>
    );
}
