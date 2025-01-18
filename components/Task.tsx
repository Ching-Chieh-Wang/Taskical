import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';
import TaskActionNav from './TaskActionNav';
import TaskStatusComponent from './TaskStatusComponent';
import { Link } from 'expo-router';

const Task = ({ index }: { index: number }) => {
  const { state } = useTaskContext();
  const {  title } = state.tasks[index];



  return (
    <View className="flex gap-y-2 p-4  border-gray-300 border-2 rounded-2xl">
      <View className='flex-row justify-between items-center'>
        <Link href={{pathname:'/task/[idx]', params:{idx:index}}} className="font-bold">{title}</Link>
        <TaskActionNav index={index}/>
      </View>

      <TaskStatusComponent index={index}/>
    </View>
  );
};

export default Task;