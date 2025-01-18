import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Task } from '@/types/Task';

// Define the state shape
interface TaskState {
  tasks: Task[]; // Tracks the list of tasks
}

// Hard-coded mock data for tasks
const mockTasks: Task[] = [
  { id: 1, title: 'Task One', description: 'This is the first task', status: 'pending' },
  { id: 2, title: 'Task Two', description: 'This is the second task', status: 'complete' },
  { id: 3, title: 'Task Three', description: 'This is the third task', status: 'pending' },
];

// Initial state
const initialState: TaskState = {
  tasks: mockTasks,
};

// Reducer function (no actions for now)
const taskReducer = (state: TaskState): TaskState => {
  return state; // Simply returns the state as-is
};

// Context definition
const TaskContext = createContext<{
  state: TaskState;
}>({
  state: initialState,
});

// Provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state] = useReducer(taskReducer, initialState);

  return <TaskContext.Provider value={{ state }}>{children}</TaskContext.Provider>;
};

// Custom hook for consuming the context
export const useTaskContext = () => useContext(TaskContext);