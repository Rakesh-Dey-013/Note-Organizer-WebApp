// TaskForm.jsx
import React, { useState } from "react";

/**
 * TaskForm
 * - Tailwind + dark theme (container uses bg-zinc-900)
 * - Posts { title, message } to POST /api/tasks as JSON
 * - Props:
 *    onSuccess?: (data) => void  // callback after successful creation
 */
export default function TaskForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!title.trim() || !message.trim()) {
      setError("Both title and message are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.trim(), message: message.trim() }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || `Request failed with status ${res.status}`);
      }

      const data = await res.json().catch(() => ({}));

      setSuccessMsg("Task created successfully.");
      setTitle("");
      setMessage("");
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error("Error creating task:", err);
      setError(err.message || "Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-linear-to-br from-zinc-800/90 to-zinc-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl"
        aria-label="Create task"
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-violet-700">
            Create Note
          </h2>
          <div className="h-1 w-20 bg-linear-to-r from-blue-600 to-violet-700 rounded-full mt-2"></div>
        </div>

        {error && (
          <div className="mb-5 text-sm text-red-200 bg-red-950/40 border border-red-800/50 p-4 rounded-xl backdrop-blur-sm">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="mb-5 text-sm text-emerald-200 bg-emerald-950/40 border border-emerald-800/50 p-4 rounded-xl backdrop-blur-sm">
            {successMsg}
          </div>
        )}

        <label className="block mb-5">
          <span className="text-sm font-medium text-slate-300 mb-2 block">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Short title for the note"
            className="mt-1 block w-full rounded-xl px-4 py-3 bg-zinc-950/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
            maxLength={100}
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-sm font-medium text-slate-300 mb-2 block">Details</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the note..."
            rows={6}
            className="mt-1 block w-full rounded-xl px-4 py-3 bg-zinc-950/50 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-y"
            required
          />
        </label>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200
              ${loading 
                ? "bg-slate-700/50 text-slate-400 cursor-not-allowed" 
                : "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105"}
              focus:outline-none focus:ring-2 focus:ring-blue-400/50`}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Note"
            )}
          </button>

          <button
            type="button"
            onClick={() => { setTitle(""); setMessage(""); setError(null); setSuccessMsg(null); }}
            className="text-sm font-medium text-slate-400 hover:text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}