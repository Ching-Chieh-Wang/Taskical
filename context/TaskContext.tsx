import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Alert } from "react-native";
import { TaskStatus } from '@/types/TaskStatus';
import { Task } from '@/types/Task';

// Define the state shape
interface TaskState {
  tasks: Task[];
  originalTasks: Task[];
  editingIdx: number;
  searchText: string;
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
  originalTasks: mockTasks,
  editingIdx: -1,
  searchText: "",
};

// Action types
enum TaskActionType {
  SET_TASKS = 'SET_TASKS',
  START_EDITING_TASK = 'START_EDITING_TASK',
  END_EDITING_TASK = 'END_EDITING_TASK',
  SEARCH_TASK = 'SEARCH_TASK',
}

// Action shape
type TaskAction =
  | { type: TaskActionType.SET_TASKS; payload: { tasks: Task[], originalTasks: Task[] } }
  | { type: TaskActionType.START_EDITING_TASK; payload: { idx: number } }
  | { type: TaskActionType.END_EDITING_TASK }
  | { type: TaskActionType.SEARCH_TASK; payload: { text: string } }

// Reducer function
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case TaskActionType.SET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        originalTasks: action.payload.originalTasks
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
    case TaskActionType.SEARCH_TASK:
      return {
        ...state,
        searchText: action.payload.text
      }
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
    searchTask: (text: string) => void
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
    searchTask: () => { }
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
      const updatedTasks = [task, ...state.originalTasks];
      dispatch({ type: TaskActionType.SET_TASKS, payload: { tasks: updatedTasks, originalTasks: updatedTasks } });
      return true;
    },
    updateTaskStatus: (id: number, status: TaskStatus) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      const updatedOriginalTasks = state.originalTasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      dispatch({ type: TaskActionType.SET_TASKS, payload: { tasks: updatedTasks, originalTasks: updatedOriginalTasks } });
    },
    deleteTask: (id: number) => {

      // Update tasks by removing the item at the given id
      const updatedTasks = state.tasks.filter((task) => task.id !== id);

      const updatedOriginalTasks = state.originalTasks.filter((task) => task.id !== id);

      // Dispatch updated tasks and originalTasks
      dispatch({ type: TaskActionType.SET_TASKS, payload: { tasks: updatedTasks, originalTasks: updatedOriginalTasks } });

    },
    startEditingTask: (idx: number) => {
      dispatch({ type: TaskActionType.START_EDITING_TASK, payload: { idx } });
    },
    endEditingTask: () => {
      dispatch({ type: TaskActionType.END_EDITING_TASK });
    },
    updateTask: (id: number, task: Task) => {
      if (!isValidTaskInput(task)) return;
      const updatedTasks = state.tasks.map((oldTask) =>
        oldTask.id === id ? task : oldTask
      );

      const updatedOriginalTasks = state.originalTasks.map((oldTask) =>
        oldTask.id === id ? task : oldTask
      );
      dispatch({ type: TaskActionType.SET_TASKS, payload: { tasks: updatedTasks, originalTasks: updatedOriginalTasks } });
      dispatch({ type: TaskActionType.END_EDITING_TASK })
    },
    searchTask: (text: string) => {
      // Filter tasks by title or description based on the search text
      let filteredTasks :Task[];
      if (text.length) {
        filteredTasks = state.originalTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(text.toLowerCase()) ||
            task.description.toLowerCase().includes(text.toLowerCase())
        );
      }
      else{
        filteredTasks=state.originalTasks
      }

      // Update the tasks in the state with the filtered results
      dispatch({
        type: TaskActionType.SET_TASKS,
        payload: { tasks: filteredTasks, originalTasks: state.originalTasks },
      });
      dispatch({
        type: TaskActionType.SEARCH_TASK, payload: { text }
      })
    },

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