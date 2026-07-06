const express = require("express");
const cors = require("cors");

const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("HELLO TEST 123");
});

// Get all tasks
// Get all tasks
app.get("/tasks/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql =
    "SELECT * FROM tasks WHERE user_id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error");
    }

    res.json(result);
  });
});

//app.post("/add-task", (req, res) => {
  app.post("/add-task", (req, res) => {

  const {
    user_id,
    task_name,
    subject,
    priority,
    due_date
  } = req.body;

  const sql =
    "INSERT INTO tasks (user_id, task_name, subject, priority, due_date) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      user_id,
      task_name,
      subject,
      priority,
      due_date
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error");
      }

      res.send("Task Added Successfully");
    }
  );
});
app.delete("/delete-task/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM tasks WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error");
        }

        res.send("Task Deleted Successfully");
    });
});
app.put("/complete-task/:id", (req, res) => {
    const id = req.params.id;

    const sql =
        "UPDATE tasks SET completed = 1 WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error");
        }

        res.send("Task Completed");
    });
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.put("/update-task/:id", (req, res) => {
  const {user_id, task_name,subject, priority, due_date } = req.body;
  const id = req.params.id;

  const sql =
    "UPDATE tasks SET task_name=?, priority=?, due_date=? WHERE id=?";

  db.query(
    sql,
    [task_name, priority, due_date, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      } else {
        res.send("Updated");
      }
    }
  );
});
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  const sql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(
    sql,
    [username, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      res.send("User Registered Successfully");
    }
  );
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=? AND password=?";

  db.query(
    sql,
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error");
      }

      if (result.length > 0) {
        res.json({
          success: true,
          user: result[0],
        });
      } else {
        res.json({
          success: false,
          message: "Invalid Email or Password",
        });
      }
    }
  );
});
app.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});
app.post("/add-note", (req, res) => {
  const { title, content } = req.body;

  db.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send("Note Added");
      }
    }
  );
});
app.delete("/delete-note/:id", (req, res) => {
  db.query(
    "DELETE FROM notes WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send("Deleted");
      }
    }
  );
});
