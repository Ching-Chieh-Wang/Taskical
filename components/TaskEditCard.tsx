import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTaskContext } from '@/context/TaskContext';
import TaskStatusComponent from './TaskStatusComponent';

const TaskEditCard = ({ index }: { index: number }) => {
    const { state, actions } = useTaskContext();
    const task = state.tasks[index];

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSave = () => {
        const updatedTask= {...task,title,description}
        actions.updateTask(task.id, updatedTask)
    };

    return (
        <View className="flex gap-y-4 p-4 bg-white rounded-lg shadow-lg ">
            <Text className="text-lg font-semibold">Edit Task</Text>

            {/* Title Input */}
            <View>
                <Text className="text-gray-700 mb-2">Title</Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter task title"
                    className="border border-gray-300 rounded-lg p-2"
                />
            </View>

            {/* Description Input */}
            <View>
                <Text className="text-gray-700 mb-2">Description</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter task description"
                    multiline
                    className="border border-gray-300 rounded-lg p-2"
                />
            </View>


            {/* Buttons */}
            <View className='flex-row gap-x-4'>
                <TouchableOpacity
                    onPress={actions.endEditingTask}
                    className="flex-1 px-4 py-2 bg-red-200  border-red-400 border-2  rounded-md"
                >
                    <Text className="text-red-600 text-center">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSave}
                    className="flex-1 px-4 py-2 bg-teal-600 rounded-md"
                >
                    <Text className="text-white text-center">Save</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default TaskEditCard;