import React, { createContext, useReducer, useEffect } from "react";

const TaskContext = createContext();

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

function reducer(state, action) {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload];
        case "TOGGLE_TASK":
            return state.map((task) =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        case "DELETE_TASK":
            return state.filter((task) => task.id !== action.payload);
        default:
            return state;
    }
}

export function TaskProvider({ children }) {
    const [tasks, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}

export default TaskContext;
