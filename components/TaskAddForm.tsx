import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { useTaskContext } from "@/context/TaskContext";
import { TaskStatus } from "@/types/TaskStatus";

const TaskAddForm: React.FC = () => {
  const { actions } = useTaskContext();
  const [title, setTitle] = useState<string>(""); // Task title
  const [description, setDescription] = useState<string>(""); // Task description

  // Add a new task and reset the form if successful
  const handleAddTask = () => {
    const success = actions.addTask({
      id: Date.now(),
      title,
      description,
      status: TaskStatus.PENDING,
    });

    if (success) resetForm();
  };

  // Reset the form and dismiss the keyboard
  const resetForm = () => {
    setTitle("");
    setDescription("");
    Keyboard.dismiss();
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

      <View className="flex-row gap-x-4">
        <TouchableOpacity
          onPress={resetForm}
          className="flex-1 px-4 py-2 bg-red-200 border-red-400 border-2 rounded-md"
        >
          <Text className="text-red-600 text-center">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleAddTask}
          className="flex-1 px-4 py-2 bg-teal-600 rounded-md"
        >
          <Text className="text-white text-center">Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskAddForm;