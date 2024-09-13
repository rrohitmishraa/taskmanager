import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types";

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    markTaskCompleted: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = "completed";
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, markTaskCompleted } =
  tasksSlice.actions;
export default tasksSlice.reducer;
