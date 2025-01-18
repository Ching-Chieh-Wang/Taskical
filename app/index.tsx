import { Text, View, ScrollView } from "react-native";
import Task from "@/components/Task";
import { useTaskContext } from "@/context/TaskContext";
import TaskAddForm from "@/components/TaskAddForm";

export default function Index() {
  const { state } = useTaskContext(); // Access the tasks from TaskContext

  return (
      <View className="flex-1  mx-3"> {/* Ensure the parent view has flex-1 */}
        <Text className="text-2xl font-bold mb-2">Task Lists</Text>
        <TaskAddForm />
        <ScrollView
          className="flex-1  px-2 border border-gray-200 rounded-lg"
          contentContainerStyle={{ flexGrow: 1 }} // Tailwind doesn't handle this
          showsVerticalScrollIndicator={true}
        >
          {state.tasks.map((task, index) => (
            <Task key={task.id} index={index} />
          ))}
        </ScrollView>
      </View>
  );
}