// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import TaskDetail from "./components/TaskDetail";
import icon from "./assets/notes.png"
import icon2 from "./assets/post-it.png"

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch task list
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const files = await res.json();

      const formattedTasks = files.map((file) => ({
        title: file.replace(".txt", ""),
        message: "Click Read More to view the full content.",
      }));

      setTasks(formattedTasks);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Handle Read More → navigate to route
  const handleReadMore = (task) => {
    navigate(`/${task.title}`);
  };

  const handleTaskCreated = () => {
    fetchTasks();
  };

  return (
    <Routes>
      {/* ✅ Main Home Page */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col items-center py-10 px-6">
            <div className="relative mb-12">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r  from-blue-700 to-emerald-500 text-center flex gap-3">
                <img src={icon2} alt="" className="w-10 h-10"/>
                Note Organizer WebApp
                <img src={icon} alt="" className="w-10 h-10"/>
              </h1>
              <div className="flex justify-center mt-3">
                <div className="h-1.5 w-70 bg-linear-to-r from-blue-700 to-emerald-500 rounded-full"></div>
              </div>
              <p className="text-slate-400 text-center mt-4 text-sm">
                Organize your notes efficiently
              </p>

            </div>

            {/* Task Creation Form */}
            <div className="w-full max-w-2xl mb-10">
              <TaskForm onSuccess={handleTaskCreated} />
            </div>

            {/* Task List Section */}
            <div className="w-full max-w-6xl">
              <h2 className="text-2xl font-semibold mb-2 text-white">My Notes</h2>
              <div className="h-1.5 w-40 bg-linear-to-r from-blue-700 to-emerald-500 rounded-full mb-5"></div>

              {loading && <p className="text-zinc-400">Loading notes...</p>}
              {error && <p className="text-red-400">Error: {error}</p>}

              {!loading && !error && tasks.length === 0 && (
                <p className="text-zinc-400">No notes found. Create one above.</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task, index) => (
                  <TaskCard
                    key={index}
                    title={task.title}
                    message={task.message}
                    onReadMore={() => handleReadMore(task)}
                  />
                ))}
              </div>
            </div>
          </div>
        }
      />

      {/* ✅ File detail page */}
      <Route path="/:filename" element={<TaskDetail />} />
    </Routes>
  );
}
