import { View, Text} from "react-native"
import { Stack } from "expo-router";
import "../global.css"
import { TaskProvider } from '@/context/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <View className="py-14  flex-1 bg-white">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </TaskProvider>
  )
}
