import { useState } from "react";
import { View, Text, TextInput, Button, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useTaskContext } from "@/context/TaskContext";
import { TaskStatus } from "@/types/TaskStatus";

const TaskAddForm = () => {
  const { actions } = useTaskContext(); // Access the addTask function from TaskContext
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {

    actions.addTask({
      id: Date.now(), // Generate a unique ID
      title,
      description,
      status: TaskStatus.PENDING, // Add a default status
    });
    setTitle(""); // Clear form inputs
    setDescription("");
    Keyboard.dismiss(); // Dismiss keyboard after adding a task
  };

  return (

      <View className="mb-2 border-gray-200 border-2 p-3">
        <Text className="text-xl font-semibold mb-4">Add a New Task</Text>

        <View className="mb-3">
          <Text className="text-sm font-medium mb-1">Task Title:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Enter the task title"
            autoFocus={false}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View className="mb-3">
          <Text className="text-sm font-medium mb-1">Task Description:</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Enter the task description"
            autoFocus={false}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <Button title="Add Task" onPress={handleAddTask} />
      </View>

  );
};

export default TaskAddForm;