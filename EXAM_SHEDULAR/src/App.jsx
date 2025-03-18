import React, { useState } from "react";
import "./App.css";
import Login from "./Login.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [className, setClassName] = useState("");
  const [classes, setClasses] = useState({});
  const [exam, setExam] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");

  const handleLogin = (username, password) => {
    if (username === "user123" && password === "pass123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid login credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleAddClass = () => {
    if (className) {
      setClasses({ ...classes, [className]: [] });
      setClassName("");
    }
  };

  const handleRemoveClass = (classKey) => {
    const updatedClasses = { ...classes };
    delete updatedClasses[classKey];
    setClasses(updatedClasses);
  };

  const handleAddExam = (classKey) => {
    if (exam && examDate && examTime) {
      const newExam = { exam, examDate, examTime };
      setClasses({
        ...classes,
        [classKey]: [...classes[classKey], newExam],
      });
      setExam("");
      setExamDate("");
      setExamTime("");
    }
  };

  const handleRemoveExam = (classKey, index) => {
    const updatedExams = classes[classKey].filter((_, i) => i !== index);
    setClasses({ ...classes, [classKey]: updatedExams });
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Login</h1>
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Enter username" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button className="login-btn" onClick={() => handleLogin("user123", "pass123")}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <nav className="navbar">
        <h2>Lab Scheduler</h2>
        <ul>
          <li><a href="#" onClick={handleLogout}>Change User</a></li>
          <li><a href="#" onClick={() => toggleSection("about")}>About</a></li>
          <li><a href="#" onClick={() => toggleSection("contact")}>Contact</a></li>
        </ul>
      </nav>

      {activeSection ? null : <h1>Exam Scheduler</h1>}

      {activeSection === "about" && (
        <section id="about">
          <h2>About Exam Scheduling</h2>
          <p>Exam scheduling helps students and teachers manage their exams effectively. With this tool, users can add, modify, and remove exams, ensuring a well-organized academic calendar.</p>
        </section>
      )}

      {activeSection === "contact" && (
        <section id="contact">
          <h2>Contact</h2>
          <p>For any inquiries, please contact: 9360138590</p>
        </section>
      )}

      {!activeSection && (
        <>
          <div className="add-class">
            <input
              type="text"
              placeholder="Enter Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <button onClick={handleAddClass}>Add Class</button>
          </div>

          <div className="class-list">
            {Object.keys(classes).map((classKey) => (
              <div key={classKey} className="class-card">
                <h2>{classKey}</h2>
                <button className="remove-class-btn" onClick={() => handleRemoveClass(classKey)}>Remove Class</button>
                <div className="add-exam">
                  <input
                    type="text"
                    placeholder="Exam Name"
                    value={exam}
                    onChange={(e) => setExam(e.target.value)}
                  />
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                  />
                  <input
                    type="time"
                    value={examTime}
                    onChange={(e) => setExamTime(e.target.value)}
                  />
                  <button onClick={() => handleAddExam(classKey)}>Add Exam</button>
                </div>
                <div className="exam-container">
                  {classes[classKey].map((examItem, index) => (
                    <div key={index} className="exam-card">
                      <p><strong>{examItem.exam}</strong></p>
                      <p>{examItem.examDate} at {examItem.examTime}</p>
                      <button onClick={() => handleRemoveExam(classKey, index)}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
