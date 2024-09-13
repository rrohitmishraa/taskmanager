import React, { useState, useEffect } from "react";
import { Task } from "../types";

interface TaskFormProps {
  isEditing: boolean;
  editId: string | null;
  existingTask?: Task;
  onReset: () => void;
  onAdd: (task: Task) => void;
  onUpdate: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isEditing,
  editId,
  existingTask,
  onReset,
  onAdd,
  onUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  useEffect(() => {
    if (isEditing && existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setDueDate(existingTask.dueDate);
      setPriority(existingTask.priority);
    }
  }, [isEditing, existingTask]);

  const handleSubmit = () => {
    const task: Task = {
      id: editId || Date.now().toString(),
      title,
      description,
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
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("low");
    onReset();
  };

  return (
    <div className="mb-6">
      <input
        className="border p-2 w-full mb-2 rounded-lg"
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2 rounded-lg"
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2 rounded-lg"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        className="border p-2 w-full mb-2 rounded-lg"
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
        className="bg-blue-500 text-white p-2 rounded-lg mr-2"
        onClick={handleSubmit}
      >
        {isEditing ? "Update Task" : "Add Task"}
      </button>
      {isEditing && (
        <button
          className="bg-gray-500 text-white p-2 rounded-lg"
          onClick={resetForm}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default TaskForm;
