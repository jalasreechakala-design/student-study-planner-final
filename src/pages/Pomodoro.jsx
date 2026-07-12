import React, { useState, useEffect } from "react";

function Pomodoro() {
  const [seconds, setSeconds] = useState(1500); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let timer;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (seconds === 0) {
      setIsRunning(false);
      setSessions((prev) => prev + 1);
      alert("🎉 Pomodoro Completed!");
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(1500);
  };

  return (
    <div className="pomodoro-container">
      <h1>🍅 Pomodoro Timer</h1>
      <div className="mode-buttons">
  <button onClick={() => {
    setSeconds(1500);
    setIsRunning(false);
  }}>
    📚 Study
  </button>

  <button onClick={() => {
    setSeconds(300);
    setIsRunning(false);
  }}>
    ☕ Short Break
  </button>

  <button onClick={() => {
    setSeconds(900);
    setIsRunning(false);
  }}>
    🌴 Long Break
  </button>
</div>

      <h2>{minutes}:{secs}</h2>

      <div className="timer-buttons">
        <button onClick={() => setIsRunning(true)}>
          ▶ Start
        </button>

        <button onClick={() => setIsRunning(false)}>
          ⏸ Pause
        </button>

        <button onClick={resetTimer}>
          🔄 Reset
        </button>
      </div>

      <h3>Today's Sessions: {sessions}</h3>
    </div>
  );
}

export default Pomodoro;