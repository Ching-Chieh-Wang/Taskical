import { Text, View } from 'react-native';
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';

const Task = ({ index }: { index: number }) => {
  const { state } = useTaskContext();
  const { title, description, status } = state.tasks[index];

  return (
    <View className="gap-y-2 p-4 my-2 border-gray-300 border-2 rounded-2xl">
      {/* Task Title */}
      <Text className="font-bold">{title}</Text>

      {/* Task Description */}
      <Text>{description}</Text>

      {/* Task Status */}
      <Text className={'text-sm'}>status: {status}</Text>
    </View>
  );
};

export default Task;