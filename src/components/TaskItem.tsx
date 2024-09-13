// src/components/TaskItem.tsx
import React from "react";
import { Task } from "../types";

const TaskItem: React.FC<{
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkAsCompleted: (id: string) => void;
}> = ({ task, onEdit, onDelete, onMarkAsCompleted }) => {
  return (
    <div
      className={`p-6 mb-4 shadow-lg rounded-lg ${
        task.status === "completed" ? "bg-green-50" : "bg-white"
      }`}
    >
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="text-gray-700">{task.description}</p>
      <p className="text-gray-500">Due Date: {task.dueDate}</p>
      <p className="text-gray-500">Priority: {task.priority}</p>
      <p
        className={`font-medium ${
          task.status === "completed" ? "text-green-600" : "text-gray-600"
        }`}
      >
        Status: {task.status}
      </p>
      <div className="mt-4 flex space-x-2">
        <button
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300"
          onClick={() => onEdit(task.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
        {task.status === "in-progress" && (
          <button
            className="bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700 transition duration-300"
            onClick={() => onMarkAsCompleted(task.id)}
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
