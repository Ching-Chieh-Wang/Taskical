import { View, Text, TouchableOpacity } from 'react-native'
import { useTaskContext } from '@/context/TaskContext';
import { TaskStatus } from '@/types/TaskStatus';
import React from 'react'

const TaskStatusComponent = ({ index }: { index: number }) => {
    const { state, actions } = useTaskContext(); 
    const { id, status} = state.tasks[index]

    const handleStatusChange = (newStatus: TaskStatus) => {
    if (newStatus !== status) {
        actions.updateTaskStatus(id, newStatus); // Update the status using context action
    }
    };
    return (

        <View className="flex-row gap-x-4 mt-2">
            {/* Pending Button */}
            <TouchableOpacity
                onPress={() => handleStatusChange(TaskStatus.PENDING)}
                className={`px-4 py-2 rounded-full ${status === TaskStatus.PENDING ? 'border-2 border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-200'
                    }`}
            >
                <Text className={status === TaskStatus.PENDING ? 'text-blue-700' : 'text-gray-700'}>Pending</Text>
            </TouchableOpacity>

            {/* Complete Button */}
            <TouchableOpacity
                onPress={() => handleStatusChange(TaskStatus.COMPLETE)}
                className={`px-4 py-2 rounded-full ${status === TaskStatus.COMPLETE ? 'border-2 border-green-500 bg-green-100' : 'border-gray-300 bg-gray-200'
                    }`}
            >
                <Text className={status === TaskStatus.COMPLETE ? 'text-green-700' : 'text-gray-700'}>Complete</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TaskStatusComponent