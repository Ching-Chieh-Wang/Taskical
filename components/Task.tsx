import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { TaskStatus } from '@/types/TaskStatus';
import TaskStatusComponent from './TaskStatusComponent';

const Task = ({ index }: { index: number }) => {
  const { state } = useTaskContext();
  const {  title, description } = state.tasks[index];



  return (
    <View className="gap-y-2 p-4 my-2 border-gray-300 border-2 rounded-2xl">
      {/* Task Title */}
      <Text className="font-bold">{title}</Text>

      {/* Task Description */}
      <Text>{description}</Text>

      <TaskStatusComponent index={index}/>
    </View>
  );
};

export default Task;