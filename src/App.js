import { useEffect, useState } from "react";
import "./App.css";
import Analytics from "./pages/Analytics";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import CalendarPage from "./pages/Calendar";
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("register");
  const [editingId, setEditingId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  
  const [subject, setSubject] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user) {
    fetchTasks();
    }
  }, [user]);

  const fetchTasks = () => {
    if (!user) return;
    fetch(`https://student-study-planner-qpdr.onrender.com/tasks/${user.id}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  const addTask = async () => {

if (
  taskName.trim() === "" ||
  subject.trim() === "" ||
  priority.trim() === "" ||
  dueDate.trim() === ""
) {
  alert("Please fill all fields");
  return;
}
    const response = await fetch(
      `https://student-study-planner-qpdr.onrender.com/add-task/${user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
  task_name: taskName,
  subject: subject,
  priority: priority,
  due_date: dueDate,
}),
        
      }
    );

    if (response.ok) {
      alert("Task Added Successfully");
      setTaskName("");
      setPriority("");
      setDueDate("");
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    const response = await fetch(
      `https://student-study-planner-qpdr.onrender.com/delete-task/${user.id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      fetchTasks();
    }
  };

  const completeTask = async (id) => {
    const response = await fetch(
      `https://student-study-planner-qpdr.onrender.com/complete-task/${user.id}`,
      {
        method: "PUT",
      }
    );

    if (response.ok) {
      fetchTasks();
    }
  };
  const updateTask = async (id) => {
  const response = await fetch(
    `https://student-study-planner-qpdr.onrender.com/update-task/${user.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_name: editTaskName,
        priority: editPriority,
        due_date: editDueDate,
      }),
    }
  );

  if (response.ok) {
    alert("Task Updated Successfully");
    setEditingId(null);
    fetchTasks();
  }
};

  const filteredTasks = tasks.filter((task) =>
    task.task_name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isLoggedIn) {

  if (page === "register") {
    return <Register setPage={setPage} />;
  }

  return (
    <Login
      setPage={setPage}
      setIsLoggedIn={setIsLoggedIn}
       setUser={setUser}
    />
  );
}
console.log("isLoggedIn =", isLoggedIn);
console.log("page =", page);
console.log("user =", user);

return (
    <div
  className={
    darkMode
      ? "container dark"
      : "container"
  }
>
  {
    isLoggedIn && (
      <div
  className={`sidebar ${
    menuOpen ? "show-sidebar" : ""
  }`}
>
        <h2>📚 Study Planner</h2>
        <button
  className="theme-btn"
  onClick={() =>
    setDarkMode(!darkMode)
  }
>
  {darkMode
    ? "☀ Light Mode"
    : "🌙 Dark Mode"}
</button>

        <ul>
          <li onClick={() => setPage("dashboard")}>
            🏠 Dashboard
          </li>

          <li onClick={() => setPage("tasks")}>
            ✅ Tasks
          </li>

          <li onClick={() => setPage("notes")}>
            📝 Notes
          </li>

          <li onClick={() => setPage("analytics")}>
            📊 Analytics
          </li>
          <li onClick={() => setPage("calendar")}>
  📅 Calendar
</li>
          
          <li
  onClick={() => {
    setIsLoggedIn(false);
    setPage("login");
  }}
>
  🚪 Logout
</li>
        </ul>
      </div>
    )}

      {/* Main Content */}
      <button
  style={{
    display: "block",
    background: "red",
    color: "white",
    padding: "10px",
    width: "100%"
  }}
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰ MENU TEST
</button>
<h1 style={{color:"red"}}>
  VERSION 999
</h1>
      <div className="main">

        {/* Dashboard */}
        {page === "dashboard" && (
          <>
            <h1>📚 Student Study Planner</h1>
            <p>Manage your tasks and track your progress.</p>

            <div className="card-container">
              <div className="card">
                <h3>📋 Total Tasks</h3>
                <h2>{tasks.length}</h2>
              </div>

              <div className="card">
                <h3>✅ Completed Tasks</h3>
                <h2>
                  {
                    tasks.filter(
                      (task) => task.completed === 1
                    ).length
                  }
                </h2>
              </div>

              <div className="card">
                <h3>⏳ Pending Tasks</h3>
                <h2>
                  {
                    tasks.filter(
                      (task) => task.completed !== 1
                    ).length
                  }
                </h2>
              </div>
            </div>
          </>
        )}

        {/* Tasks */}
        {page === "tasks" && (
          <>
            <h2>Add Task</h2>

            <div className="form-box">
              <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) =>
                  setTaskName(e.target.value)
                }
              />
              <select
  value={subject}
  onChange={(e) =>
    setSubject(e.target.value)
  }
>
  <option value="">
    Select Subject
  </option>

  <option value="Mathematics">
    Mathematics
  </option>

  <option value="Physics">
    Physics
  </option>

  <option value="Chemistry">
    Chemistry
  </option>

  <option value="Programming">
    Programming
  </option>

  <option value="English">
    English
  </option>
</select>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >
                <option value="">
                  Select Priority
                </option>

                <option value="High">
                  🔴 High
                </option>

                <option value="Medium">
                  🟡 Medium
                </option>

                <option value="Low">
                  🟢 Low
                </option>
              </select>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(e.target.value)
                }
              />

              <button
                className="add-btn"
                onClick={addTask}
              >
                Add Task
              </button>
            </div>

            <br />

            <input
              type="text"
              placeholder="🔍 Search Tasks"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <br />
            <br />

            {filteredTasks.map((task) => (
              <div key={task.id} className="task-card">

  {editingId === task.id ? (
    <>
      <input
        type="text"
        value={editTaskName}
        onChange={(e) =>
          setEditTaskName(e.target.value)
        }
      />

      <select
        value={editPriority}
        onChange={(e) =>
          setEditPriority(e.target.value)
        }
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="date"
        value={editDueDate}
        onChange={(e) =>
          setEditDueDate(e.target.value)
        }
      />

      <button
        onClick={() =>
          updateTask(task.id)
        }
      >
        Save
      </button>
    </>
  ) : (
    <>
      <h3>{task.task_name}</h3>

      <p>Priority: {task.priority}</p>

      <p>
        Due Date:
        {" "}
        {new Date(
          task.due_date
        ).toLocaleDateString()}
      </p>

      <p>
        {task.completed === 1
          ? "✅ Completed"
          : "⏳ Pending"}
      </p>

      <button
        onClick={() => {
          setEditingId(task.id);
          setEditTaskName(task.task_name);
          setEditPriority(task.priority);
          setEditDueDate(
            task.due_date.split("T")[0]
          );
        }}
      >
        Edit
      </button>

      {task.completed !== 1 && (
        <button
          onClick={() =>
            completeTask(task.id)
          }
        >
          Complete
        </button>
      )}

      <button
        onClick={() =>
          deleteTask(task.id)
        }
      >
        Delete
      </button>
    </>
  )}

</div>
            ))}
          </>
        )}

        {/* Notes */}
        {page === "notes" && (
  <Notes />
)}

        {/* Analytics */}
        {page === "analytics" && (
  <Analytics tasks={tasks} />
)}

        {page === "calendar" && (
  <CalendarPage />
)}

        {page === "register" && (
  <Register />
)}

</div>
</div>
);
}

export default App;