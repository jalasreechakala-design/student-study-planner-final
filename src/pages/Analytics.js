import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
function Analytics({ tasks }) {
  const completed = tasks.filter(
    (task) => task.completed === 1
  ).length;

  const pending = tasks.length - completed;
const data = [
  {
    name: "Completed",
    value: completed,
  },
  {
    name: "Pending",
    value: pending,
  },
];

const COLORS = [
  "#00C49F",
  "#FF8042",
];
  const percentage =
    tasks.length > 0
      ? Math.round(
          (completed / tasks.length) * 100
        )
      : 0;

  return (
    <div>
      <h1>📊 Analytics</h1>

      <div className="card-container">
        <div className="card">
          <h3>📋 Total Tasks</h3>
          <h2>{tasks.length}</h2>
        </div>

        <div className="card">
          <h3>✅ Completed</h3>
          <h2>{completed}</h2>
        </div>

        <div className="card">
          <h3>🎯 Success Rate</h3>
          <h2>{percentage}%</h2>
        </div>
      </div>

      <br />

      <div className="welcome-card">
        <h2>📈 Progress Summary</h2>
        <p>
          You have completed {completed} out of {tasks.length} tasks.
        </p>
      </div>
      <br />

<h2>📊 Task Completion Chart</h2>

<PieChart width={400} height={300}>
  <Pie
    data={data}
    cx="50%"
    cy="50%"
    outerRadius={100}
    dataKey="value"
    label
  >
    {data.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={COLORS[index]}
      />
    ))}
  </Pie>

  <Tooltip />
  <Legend />
</PieChart>
    </div>
  );
}

export default Analytics;