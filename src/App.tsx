import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import {
  addTask,
  deleteTask,
  updateTask,
  markTaskCompleted,
} from "./redux/tasksSlice";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "./App.css";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleEditTask = (id: string) => {
    setEditId(id);
    setIsEditing(true);
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleMarkAsCompleted = (id: string) => {
    dispatch(markTaskCompleted(id));
  };

  const handleResetForm = () => {
    setEditId(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="w-full md:w-1/3 p-8 bg-white shadow-lg border-r border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
        <TaskForm
          isEditing={isEditing}
          editId={editId}
          existingTask={
            editId ? tasks.find((task) => task.id === editId) : undefined
          }
          onReset={handleResetForm}
          onAdd={(task) => dispatch(addTask(task))}
          onUpdate={(task) => dispatch(updateTask(task))}
        />
      </div>

      <div className="w-full md:w-2/3 p-8 bg-gray-50">
        <input
          className="border rounded-lg p-3 w-full mb-6 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <TaskList
          tasks={tasks}
          searchQuery={searchQuery}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onMarkAsCompleted={handleMarkAsCompleted}
        />
      </div>
    </div>
  );
};

export default App;
