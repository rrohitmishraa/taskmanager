import React, { useEffect, useState } from "react";
import { Task } from "../types";

interface TaskFormProps {
  isEditing: boolean;
  editId: string | null;
  existingTask: Task | undefined;
  onAdd: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onReset: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isEditing,
  editId,
  existingTask,
  onAdd,
  onUpdate,
  onReset,
}) => {
  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(
    existingTask?.description || ""
  );
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    existingTask?.priority || "low"
  );

  // Reset the form fields when the editing task changes
  useEffect(() => {
    if (isEditing && existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setDueDate(existingTask.dueDate);
      setPriority(existingTask.priority);
    } else {
      resetForm();
    }
  }, [isEditing, existingTask]);

  const handleSubmit = () => {
    if (title.trim() && description.trim() && dueDate) {
      const task: Task = {
        id: editId || Date.now().toString(),
        title: title.trim(),
        description: description.trim(),
        dueDate,
        priority,
        status: "in-progress",
      };

      if (isEditing && editId) {
        onUpdate(task);
      } else {
        onAdd(task);
      }

      resetForm();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("low");
    onReset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <input
        className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input
        className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <select
        className="border p-2 w-full mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "low" | "medium" | "high")
        }
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        className="bg-blue-500 text-white p-2 rounded w-full disabled:bg-gray-300 transition-colors"
        onClick={handleSubmit}
        disabled={!title.trim() || !description.trim() || !dueDate}
      >
        {isEditing ? "Update Task" : "Add Task"}
      </button>
      {isEditing && (
        <button
          className="ml-2 bg-gray-500 text-white p-2 rounded w-full mt-2 transition-colors"
          onClick={resetForm}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default TaskForm;
