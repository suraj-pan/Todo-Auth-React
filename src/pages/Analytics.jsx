import React, { useContext, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import TaskContext from "../context/TaskContext";

export default function Analytics() {
    const { tasks } = useContext(TaskContext);

    const stats = useMemo(() => {
        const completed = tasks.filter((t) => t.completed).length;
        const pending = tasks.length - completed;
        return [
            { name: "Completed", value: completed },
            { name: "Pending", value: pending },
        ];
    }, [tasks]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Task Analytics</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
