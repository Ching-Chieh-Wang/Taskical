import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Alert } from "react-native";
import { TaskStatus } from '@/types/TaskStatus';
import { Task } from '@/types/Task';

// Define the state shape
interface TaskState {
  tasks: Task[];
  editingIdx: number;
}

// Mock data
const mockTasks: Task[] = [
  { id: 1, title: 'Task One', description: 'This is the first task', status: TaskStatus.PENDING },
  { id: 2, title: 'Task Two', description: 'This is the second task', status: TaskStatus.COMPLETE },
  { id: 3, title: 'Task Three', description: 'This is the third task', status: TaskStatus.PENDING },
];

// Initial state
const initialState: TaskState = {
  tasks: mockTasks,
  editingIdx: -1,
};

// Action types
enum TaskActionType {
  SET_TASKS = 'SET_TASKS',
  START_EDITING_TASK = 'START_EDITING_TASK',
  END_EDITING_TASK = 'END_EDITING_TASK',
}

// Action shape
type TaskAction =
  | { type: TaskActionType.SET_TASKS; payload: { tasks: Task[] } }
  | { type: TaskActionType.START_EDITING_TASK; payload: { idx: number } }
  | { type: TaskActionType.END_EDITING_TASK }

// Reducer function
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case TaskActionType.SET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
      };
    case TaskActionType.START_EDITING_TASK:
      return {
        ...state,
        editingIdx: action.payload.idx,
      };
    case TaskActionType.END_EDITING_TASK:
      return {
        ...state,
        editingIdx: -1,
      };
    default:
      return state;
  }
};

const TaskContext = createContext<{
  state: TaskState;
  actions: {
    addTask: (task: Task) => boolean;
    updateTaskStatus: (id: number, status: TaskStatus) => void;
    startEditingTask: (id: number) => void;
    endEditingTask: () => void;
    updateTask: (id: number, task: Task) => void;
    deleteTask: (id: number) => void;
  };
}>({
  state: initialState,
  actions: {
    addTask: () => false,
    updateTaskStatus: () => { },
    startEditingTask: () => { },
    endEditingTask: () => { },
    updateTask: () => { },
    deleteTask: () => { },
  },
});

// Provider
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Actions
  const actions = {
    addTask: (task: Task) => {
      if (!isValidTaskInput(task)) return false;
      Alert.alert("Success", "Task added successfully.");
      const updatedTasks = [task, ...state.tasks];
      dispatch({ type: TaskActionType.SET_TASKS, payload: { tasks: updatedTasks } });
      return true;
    },
    updateTaskStatus: (id: number, status: TaskStatus) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      dispatch({ type: TaskActionType.SET_TASKS, payload: { tasks: updatedTasks } });
    },
    deleteTask: (id: number) => {

      // Update tasks by removing the item at the given id
      const updatedTasks = state.tasks.filter((task) => task.id !== id);

      // Dispatch updated tasks and originalTasks
      dispatch({ type: TaskActionType.SET_TASKS, payload: { tasks: updatedTasks } });

    },
    startEditingTask: (idx: number) => {
      dispatch({ type: TaskActionType.START_EDITING_TASK, payload: { idx } });
    },
    endEditingTask: () => {
      dispatch({ type: TaskActionType.END_EDITING_TASK });
    },
    updateTask: (id: number, task: Task) => {
      if(!isValidTaskInput(task))return;
      const updatedTasks = state.tasks.map((oldTask) =>
        oldTask.id === id ? task : oldTask
      );
      dispatch({ type: TaskActionType.SET_TASKS, payload: { tasks: updatedTasks } });
      dispatch({ type: TaskActionType.END_EDITING_TASK })
    }
  };

  return (
    <TaskContext.Provider value={{ state, actions }}>
      {children}
    </TaskContext.Provider>
  );
};

// Validation function
const isValidTaskInput = (task: Task): boolean => {
  if (!task.title.trim() || !task.description.trim()) {
    Alert.alert('Error', 'Title and description cannot be empty.');
    return false;
  }
  return true;
};

// Hook
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used inside the TaskProvider');
  }
  return context;
};