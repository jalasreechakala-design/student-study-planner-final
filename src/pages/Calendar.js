import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarPage() {
  return (
    <div>
      <h1>📅 Study Calendar</h1>

      <Calendar />

      <br />

      <p>
        View your study schedule and task deadlines.
      </p>
    </div>
  );
}

export default CalendarPage;