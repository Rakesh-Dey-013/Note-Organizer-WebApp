// components/TaskDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function TaskDetail() {
    const { filename } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    // Fetch single task content
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/tasks/${filename}`);
                if (!res.ok) throw new Error("Failed to fetch task content");
                const data = await res.json();
                setTask(data);
                setNewMessage(data.message);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchTask();
    }, [filename]);

    // ✅ Handle delete
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this task?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/tasks/${filename}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete task");

            alert("Task deleted successfully!");
            navigate("/"); // go back to main page
            navigate(0);
        } catch (err) {
            setError(err.message);
        }
    };

    // ✅ Handle update
    const handleUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/tasks/${filename}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: newMessage }),
            });
            if (!res.ok) throw new Error("Failed to update task");

            alert("Task updated successfully!");

            setIsEditing(false);
            // 🧭 Redirect to same route (re-mounts component)
            navigate(0); // works like refresh in React Router v6+
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <p className="text-red-400 p-10">Error: {error}</p>;
    if (!task) return <p className="text-zinc-400 p-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100 flex flex-col items-center py-12 px-6">
            <div className="w-full max-w-4xl">
                {/* Header Card */}
                <div className="bg-linear-to-br from-zinc-800/70 to-zinc-900/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl mb-6">
                    <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                        {task.title}
                    </h1>
                    <div className="h-1 w-24 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>

                {/* Content Card */}
                <div className="bg-linear-to-br from-zinc-800/70 to-zinc-900/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
                    {/* ✅ If editing, show textarea */}
                    {isEditing ? (
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={12}
                            className="w-full bg-zinc-950/50 border border-slate-700/50 rounded-xl p-4 text-zinc-100 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all font-mono text-sm leading-relaxed"
                            placeholder="Enter task content..."
                        />
                    ) : (
                        <div className="bg-zinc-950/30 border border-slate-700/30 rounded-xl p-6 mb-6">
                            <pre className="text-slate-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                {task.message || "No content available."}
                            </pre>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                        {/* ✅ Edit/Save Button */}
                        {isEditing ? (
                            <button
                                onClick={handleUpdate}
                                className="px-6 py-2.5 bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 hover:scale-105"
                            >
                                Save ✅
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
                            >
                                Edit ✏️
                            </button>
                        )}

                        {/* ✅ Delete Button */}
                        <button
                            onClick={handleDelete}
                            className="px-6 py-2.5 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105"
                        >
                            Delete 🗑️
                        </button>

                        {/* ✅ Back Button */}
                        <Link
                            to="/"
                            className="px-6 py-2.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl font-medium transition-all duration-200 border border-slate-600/30 hover:border-slate-500/50 hover:scale-105"
                        >
                            ← Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
