import React, { useState } from "react";

function ExamCountdown() {

  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [exams, setExams] = useState([]);

  const addExam = () => {
    if (!examName || !examDate) return;

    setExams([
      ...exams,
      {
        id: Date.now(),
        name: examName,
        date: examDate,
      },
    ]);

    setExamName("");
    setExamDate("");
  };

  return (
    <div className="exam-container">

      <h1>📅 Exam Countdown</h1>

      <input
        type="text"
        placeholder="Exam Name"
        value={examName}
        onChange={(e)=>setExamName(e.target.value)}
      />

      <input
        type="date"
        value={examDate}
        onChange={(e)=>setExamDate(e.target.value)}
      />

      <button onClick={addExam}>
        Add Exam
      </button>

      {exams.map((exam)=>{

        const daysLeft =
          Math.ceil(
            (new Date(exam.date)-new Date())
            /(1000*60*60*24)
          );

        return(

          <div
            className="exam-card"
            key={exam.id}
          >

            <h3>{exam.name}</h3>

            <p>📅 {daysLeft} Days Left</p>

          </div>

        )

      })}

    </div>
  );

}

export default ExamCountdown;