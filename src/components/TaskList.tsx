import React from "react";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  searchQuery: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkAsCompleted: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  searchQuery,
  onEdit,
  onDelete,
  onMarkAsCompleted,
}) => {
  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();

      if (dateA !== dateB) {
        return dateA - dateB;
      }

      const priorityOrder: { [key: string]: number } = {
        high: 3,
        medium: 2,
        low: 1,
      };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  return (
    <div>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white p-4 mb-4 shadow-lg rounded-lg ${
              task.status === "completed"
                ? "border-green-500 border-2"
                : "border-gray-200"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
            <p className="text-gray-700 mb-2">{task.description}</p>
            <p className="text-gray-600 mb-2">Due Date: {task.dueDate}</p>
            <p className="text-gray-600 mb-2">Priority: {task.priority}</p>
            <p
              className={`text-sm font-medium ${
                task.status === "completed"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              Status: {task.status === "completed" ? "Completed" : task.status}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                className="bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                onClick={() => onEdit(task.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
              {task.status === "in-progress" && (
                <button
                  className="bg-yellow-500 text-white p-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                  onClick={() => onMarkAsCompleted(task.id)}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
