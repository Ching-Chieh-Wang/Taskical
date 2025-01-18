import { View, Text} from "react-native"
import { Stack } from "expo-router";
import "../global.css"
import { TaskProvider } from '@/context/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <View className="py-14 flex-1 bg-white">
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Tasks", // Title shown for the "home" tab
            }}
          />
          <Stack.Screen
            name="task/[idx]"
            options={{
              title: "Task detail", // Title shown for the "tasks" tab
            }}
          />
        </Stack>
      </View>
    </TaskProvider>
  );
}
