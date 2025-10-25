import React from "react";

export default function TaskCard({ task, onToggle, onDelete }) {
    return (
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow mb-2">
            <div>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={onToggle}
                    className="mr-2"
                />
                <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.title}
        </span>
            </div>
            <button
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 font-semibold"
            >
                ✕
            </button>
        </div>
    );
}
