import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>📚 Study Planner</h2>

      <ul>
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/tasks">✅ Tasks</Link></li>
        <li><Link to="/notes">📝 Notes</Link></li>
        <li><Link to="/analytics">📊 Analytics</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;