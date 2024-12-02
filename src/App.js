import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <Router>
      <div>
        {/* ナビゲーションバー */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">ホーム</Link> | <Link to="/about">アバウト</Link> | <Link to="/contact">お問い合わせ</Link>
        </nav>

        {/* ルート設定 */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>To-Do List</h1>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="タスクを入力"
                />
                <button onClick={addTask}>追加</button>
                <ul>
                  {tasks.map((t, index) => (
                    <li key={index}>
                      {t}
                      <button onClick={() => removeTask(index)}>削除</button>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

// アバウトページ
function About() {
  return (
    <div>
      <h1>アバウトページ</h1>
      <p>このアプリはReactを学ぶために作られました。</p>
    </div>
  );
}

// お問い合わせページ
function Contact() {
  return (
    <div>
      <h1>お問い合わせページ</h1>
      <p>質問があればこちらまで！</p>
    </div>
  );
}

export default App;
