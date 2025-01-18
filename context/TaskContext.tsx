import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { TaskStatus } from '@/types/TaskStatus';
import { Task } from '@/types/Task';

// Define the state shape
interface TaskState {
  tasks: Task[]; // Tracks the list of tasks
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
};

// Define action types as an enum
enum TaskActionType {
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS',
}

// Define the action shape
type TaskAction =
  | { type: TaskActionType.ADD_TASK; payload: Task }
  | { type: TaskActionType.UPDATE_TASK_STATUS; payload: { idx: number; status: TaskStatus } }

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
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, status: action.payload.status } : task
        ),
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
    updateTaskStatus: (idx:number, status: TaskStatus) => void;
  };
}>({
  state: initialState,
  actions: {
    addTask: () => {},
    updateTaskStatus: () => {},
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
      }
    },
    updateTaskStatus: (idx: number, status: TaskStatus) => {
      dispatch({ type: TaskActionType.UPDATE_TASK_STATUS, payload: { idx, status } });
    },
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