import { Stack } from "expo-router";
import "../global.css"
import { TaskProvider } from '@/context/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack />
    </TaskProvider>
  )
}
