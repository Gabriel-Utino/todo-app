import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">ホーム</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

// タスク一覧ページ
function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // APIからタスクを取得
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.slice(0, 10)); // 最初の10個だけ表示
        setLoading(false);
      })
      .catch((error) => {
        console.error("データ取得中にエラーが発生しました:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>ロード中...</p>;
  }

  return (
    <div>
      <h1>タスク一覧</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link to={`/task/${task.id}`}>{task.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// タスク詳細ページ
function TaskDetails() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams(); // URLからタスクIDを取得

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("タスク取得中にエラーが発生しました:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>ロード中...</p>;
  }

  if (!task) {
    return <p>タスクが見つかりません。</p>;
  }

  return (
    <div>
      <h1>タスク詳細</h1>
      <p>ID: {task.id}</p>
      <p>タイトル: {task.title}</p>
      <p>完了済み: {task.completed ? "はい" : "いいえ"}</p>
      <Link to="/">戻る</Link>
    </div>
  );
}

export default App;
