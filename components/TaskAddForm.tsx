import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard,  } from "react-native";
import { useTaskContext } from "@/context/TaskContext";
import { TaskStatus } from "@/types/TaskStatus";

const TaskAddForm = () => {
  const { actions } = useTaskContext(); // Access the addTask function from TaskContext
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {

    const success= actions.addTask({
      id: Date.now(), // Generate a unique ID
      title,
      description,
      status: TaskStatus.PENDING, // Add a default status
    });

    if(success)reset();
  };


  const reset = ()=>{
    setTitle(""); // Clear form inputs
    setDescription("");
    Keyboard.dismiss(); // Dismiss keyboard after adding a task
  }

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

      {/* Buttons */}
      <View className='flex-row gap-x-4'>
        <TouchableOpacity
          onPress={reset}
          className="flex-1 px-4 py-2 bg-red-200  border-red-400 border-2  rounded-md"
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