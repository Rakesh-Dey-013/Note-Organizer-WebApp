// TaskCard.jsx
import React from "react";

/**
 * TaskCard Component
 * Displays a task with title, message preview, and "Read More" button.
 *
 * Props:
 *  - title: string (required)
 *  - message: string (optional)
 *  - onReadMore: function (optional, called when "Read More" is clicked)
 */
export default function TaskCard({ title, message = "", onReadMore }) {
  const preview = message.length > 100 ? message.slice(0, 100) + "..." : message;

  return (
    <div className="group bg-linear-to-br from-zinc-800/90 to-zinc-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-slate-600/60">
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-700/0 to-violet-700/0 group-hover:from-blue-700/5 group-hover:to-zinc-700/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
      
      <div className="relative">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-slate-100 to-slate-300 mb-3 truncate group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
          {title || "Untitled Task"}
        </h3>

        <div className="h-0.5 w-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full mb-4 opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-300"></div>

        <p className="text-sm text-slate-400 mb-5 whitespace-pre-wrap leading-relaxed">
          {preview || "No description available."}
        </p>

        <button
          onClick={onReadMore}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-400 focus:outline-none transition-all duration-200 group/button"
        >
          <span>Read More</span>
          <span className="transform group-hover/button:translate-x-1 transition-transform duration-200">→</span>
        </button>
      </div>
    </div>
  );
}