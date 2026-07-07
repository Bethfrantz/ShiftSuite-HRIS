import { useMemo } from "react";


export default function WeeklyCalendar({ shifts }) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Group shifts by weekday
    const grouped = useMemo(() => {
        const map = {};
        days.forEach((d) => (map[d] = []));

        shifts.forEach((shift) => {
            const date = new Date(shift.date);
            const weekday = days[date.getDay() === 0 ? 6 : date.getDay() - 1]; // Sunday fix
            map[weekday].push(shift);
        });

        return map;
    }, [shifts]);

    return (
        <div className="calendar-grid">
            {days.map((day) => (
                <div key={day} className="calendar-day">
                    <h3>{day}</h3>

                    {grouped[day].length === 0 ? (
                        <p className="empty">No shift</p>
                    ) : (
                        grouped[day].map((shift) => (
                            <div key={shift._id} className="shift-block">
                                <p><strong>{shift.position}</strong></p>
                                <p>{shift.startTime} - {shift.endTime}</p>
                            </div>
                        ))
                    )}
                </div>
            ))}
        </div>
    );
}
