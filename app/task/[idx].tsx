import { View, Text} from 'react-native'
import {  useLocalSearchParams } from "expo-router";
import React from 'react'
import { useTaskContext } from '@/context/TaskContext';
import TaskStatusComponent from '@/components/TaskStatusComponent';

const Page = () => {  
  const {idx}=useLocalSearchParams<{idx?:string}>();
  const {state} =useTaskContext();
  const {title,description}=state.tasks[idx];
  return (
    <View className="flex-1 gap-y-2 p-4  border-gray-300 border-2 rounded-2xl">
      <Text className="font-bold text-3xl">{title}</Text>
      <Text >{description}</Text>
      <TaskStatusComponent index={idx}/>
  </View>
  )
}

export default Page