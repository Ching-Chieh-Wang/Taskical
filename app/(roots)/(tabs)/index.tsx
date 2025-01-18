import { Text, View } from "react-native";
import Task from "@/components/Task";
import { useTaskContext } from "@/context/TaskContext";

export default function Index() {
  const { state } = useTaskContext(); // Access the tasks from TaskContext

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Task Lists</Text>
      {state.tasks.map((task, index) => (
        <Task key={task.id} index={index} />
      ))}
    </View>
  );
}