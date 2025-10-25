import React, { useContext, useState, useCallback } from "react";
import TaskContext from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Dashboard() {
    const { tasks, dispatch } = useContext(TaskContext);
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [newTask, setNewTask] = useState("");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // ✅ Add new task logic
    const addTask = useCallback(() => {
        if (!newTask.trim()) return;
        dispatch({
            type: "ADD_TASK",
            payload: { id: Date.now(), title: newTask, completed: false },
        });
        setNewTask("");
    }, [newTask, dispatch]);

    // ✅ Logout logic
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully!");
            setShowLogoutModal(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <div className="relative">
            {/* Top Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                    Welcome, {user?.email || "User"} 👋
                </h2>
                <button
                    onClick={() => setShowLogoutModal(true)} // ✅ Show modal on click
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition shadow-sm"
                >
                    Logout
                </button>
            </div>

            {/* Task Input */}
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    placeholder="Add a new task..."
                />
                <button
                    onClick={addTask}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Add
                </button>
            </div>

            {/* Task List */}
            <div>
                {tasks.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">No tasks yet. Add one!</p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={() =>
                                dispatch({ type: "TOGGLE_TASK", payload: task.id })
                            }
                            onDelete={() =>
                                dispatch({ type: "DELETE_TASK", payload: task.id })
                            }
                        />
                    ))
                )}
            </div>

            {/* ✅ Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-80 text-center">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                            Confirm Logout
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to log out?
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
