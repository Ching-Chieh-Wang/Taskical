import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import EditIcon from '@/components/icons/EditIcon';
import { useTaskContext } from '@/context/TaskContext';
import DeleteIcon from './icons/DeleteIcon';

const TaskActionNav = ({ index }: { index: number }) => {
  const { actions } = useTaskContext(); // Access actions from context

  const handleEdit = () => {
    actions.startEditingTask(index); // Trigger editing action for the task
  };

  const handleDelete = () => {
    actions.deleteTask(index); // Trigger deleteTask action for the task
  };

  return (
    <View className="flex-row items-center space-x-4">
      <TouchableOpacity onPress={handleEdit} className="p-2 rounded-full bg-gray-100">
        <EditIcon  />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} className="p-2 rounded-full bg-gray-100">
        <DeleteIcon color="#FF6B6B"/>
      </TouchableOpacity>
    </View>
  );
};

export default TaskActionNav;