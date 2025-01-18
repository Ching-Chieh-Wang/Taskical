import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Alert } from "react-native";
import { TaskStatus } from '@/types/TaskStatus';
import { Task } from '@/types/Task';

// Define the state shape
interface TaskState {
  tasks: Task[]; // Tracks the list of tasks
  editingIdx: number; // Track which index task is now updating, set -1 for no editing session
}

// Hard-coded mock data for tasks
const mockTasks: Task[] = [
  { id: 1, title: 'Task One', description: 'This is the first task', status: TaskStatus.PENDING },
  { id: 2, title: 'Task Two', description: 'This is the second task', status: TaskStatus.COMPLETE },
  { id: 3, title: 'Task Three', description: 'This is the third task', status: TaskStatus.PENDING },
];

// Initial state
const initialState: TaskState = {
  tasks: mockTasks,
  editingIdx: -1, // set -1 for no editing session
};

// Define action types as an enum
enum TaskActionType {
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS',
  START_EDITING_TASK = 'START_EDITING_TASK',
  END_EDITING_TASK = 'END_EDITING_TASK',
  UPDATE_TASK = 'UPDATE_TASK'
}

// Define the action shape
type TaskAction =
  | { type: TaskActionType.ADD_TASK; payload: Task }
  | { type: TaskActionType.UPDATE_TASK_STATUS; payload: { idx: number; status: TaskStatus } }
  | { type: TaskActionType.START_EDITING_TASK; payload: { index: number; } }
  | { type: TaskActionType.END_EDITING_TASK; }
  | { type: TaskActionType.UPDATE_TASK; payload: Task }

// Reducer function
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case TaskActionType.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case TaskActionType.UPDATE_TASK_STATUS:
      const {idx,status}=action.payload;
      const updatedTasks= state.tasks;
      updatedTasks[idx].status=status
      return {
        ...state,
        tasks:updatedTasks
      };
    case TaskActionType.START_EDITING_TASK:
      return {
        ...state,
        editingIdx: action.payload.index
      };
    case TaskActionType.END_EDITING_TASK:
      return {
        ...state,
        editingIdx: -1, // set -1 for no editing session
      }
    case TaskActionType.UPDATE_TASK: {
      const updatedTasks=state.tasks;
      updatedTasks[state.editingIdx]=action.payload;
      return {
        ...state,
        tasks: updatedTasks
      }
    }

    default:
      return state;
  }
};

// Context definition
const TaskContext = createContext<{
  state: TaskState;
  actions: {
    addTask: (task: Task) => boolean;
    updateTaskStatus: (idx:number, status: TaskStatus) => void;
    startEditingTask: (idx: number) => void;
    endEditingTask: () => void;
    updateTask: (task: Task) => void;
  };
}>({
  state: initialState,
  actions: {
    addTask: () => {return false},
    updateTaskStatus: () => { },
    startEditingTask: () => { },
    endEditingTask: () => { },
    updateTask: () => { },
  },
});

// Provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Define the actions object
  const actions = {
    addTask: (task: Task) => {
      if(validateTaskInput(task)){
        Alert.alert("Success", "Add Task succesfully.");
        dispatch({ type: TaskActionType.ADD_TASK, payload: task });
        return true;
      }
      return false;
    },
    updateTaskStatus: (idx: number, status: TaskStatus) => {
      dispatch({ type: TaskActionType.UPDATE_TASK_STATUS, payload: { idx, status } });
    },
    startEditingTask: (index: number) => {
      dispatch({ type: TaskActionType.START_EDITING_TASK, payload: { index } });
    },
    endEditingTask: () => {
      dispatch({ type: TaskActionType.END_EDITING_TASK });
    },
    updateTask: (task: Task) => {
      if(validateTaskInput(task)){
        dispatch({ type: TaskActionType.UPDATE_TASK, payload: task });
        dispatch({type: TaskActionType.END_EDITING_TASK});
      }
    }
  };

  return (
    <TaskContext.Provider value={{ state, actions }}>
      {children}
    </TaskContext.Provider>
  );
};

const validateTaskInput = (task: Task): boolean => {
  const { title, description } = task;
  if (title.trim() === '' || description.trim() === '') {
    alert('Title and description cannot be empty.');
    return false;
  }
  return true;
};

// Custom hook for consuming the context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used inside the TaskProvider');
  }
  return context;
};