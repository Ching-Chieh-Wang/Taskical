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

// Define action types as an enum
enum TaskActionType {
  ADD_TASK = 'ADD_TASK',
}

// Define the action shape
type TaskAction = {
  type: TaskActionType.ADD_TASK;
  payload: Task;
};

// Reducer function
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case TaskActionType.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    default:
      return state;
  }
};

// Context definition
const TaskContext = createContext<{
  state: TaskState;
  actions: {
    addTask: (task: Task) => void;
  };
}>({
  state: initialState,
  actions: {
    addTask: () => {},
  },
});

// Provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Define the actions object
  const actions = {
    addTask: (task: Task) => {
      dispatch({ type: TaskActionType.ADD_TASK, payload: task });
    },
  };

  return (
    <TaskContext.Provider value={{ state, actions }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for consuming the context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if(!context){
    throw new Error('useTaskContext must be used inside the TaskProvider')
  }
  return context;
}