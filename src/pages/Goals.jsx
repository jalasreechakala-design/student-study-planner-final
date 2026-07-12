import React, { useState } from "react";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState("");

  const addGoal = () => {
    if (goal.trim() === "") return;

    setGoals([
      ...goals,
      {
        id: Date.now(),
        text: goal,
        completed: false,
      },
    ]);

    setGoal("");
  };

  const toggleGoal = (id) => {
    setGoals(
      goals.map((g) =>
        g.id === id
          ? { ...g, completed: !g.completed }
          : g
      )
    );
  };

  return (
    <div className="goals-container">

      <h1>🎯 Study Goals</h1>
      <div className="goal-progress">

  <div className="goal-progress-bar">
    <div
      className="goal-progress-fill"
      style={{
        width: `${
          goals.length === 0
            ? 0
            : (goals.filter(g => g.completed).length / goals.length) * 100
        }%`
      }}
    ></div>
  </div>

  <p>
    {goals.filter(g => g.completed).length} of {goals.length} Goals Completed
  </p>

</div>

      <div className="goal-input">

        <input
          type="text"
          placeholder="Enter Study Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <button onClick={addGoal}>
          Add Goal
        </button>

      </div>

      {goals.map((g) => (
        <div
          key={g.id}
          className="goal-card"
        >
          <input
            type="checkbox"
            checked={g.completed}
            onChange={() => toggleGoal(g.id)}
          />

          <span
            style={{
              textDecoration: g.completed
                ? "line-through"
                : "none",
            }}
          >
            {g.text}
          </span>
        </div>
      ))}

    </div>
  );
}

export default Goals;