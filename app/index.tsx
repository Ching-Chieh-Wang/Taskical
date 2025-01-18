import { Text, View, ScrollView } from "react-native";
import Task from "@/components/Task";
import { useTaskContext } from "@/context/TaskContext";
import TaskAddForm from "@/components/TaskAddForm";
import TaskEditCard from "@/components/TaskEditCard";

export default function Index() {
  const { state } = useTaskContext(); // Access the tasks from TaskContext
  const { editingIdx } = state; //Access which index of task is editing

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} className="flex-1  mx-3"> {/* Ensure the parent view has flex-1 */}
      <Text className="text-2xl font-bold mb-2">Task Lists</Text>
      <TaskAddForm />
      <View className="flex-1 gap-y-2 px-2 border border-gray-200 rounded-lg">
        {state.tasks.map((task, index) => (
          index == editingIdx 
            ?
            <TaskEditCard key={task.id} index={index} />
            :
            <Task key={task.id} index={index} />
        ))}
      </View>
    </ScrollView>
  );
}