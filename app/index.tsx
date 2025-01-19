import { Text, View, ScrollView, Button } from "react-native";
import Task from "@/components/Task";
import { useTaskContext } from "@/context/TaskContext";
import TaskAddForm from "@/components/TaskAddForm";
import TaskEditCard from "@/components/TaskEditCard";
import SearchBar from "@/components/Searchbar";

export default function Index() {
  const { state, actions} = useTaskContext(); // Access the tasks from TaskContext
  const { editingIdx } = state; //Access which index of task is editing

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true} className="flex mx-3"> {/* Ensure the parent view has flex-1 */}
      <View className=" flex-row justify-between items-center my-3">
        <Text className="text-2xl font-bold ">Task Lists</Text>
        <SearchBar handleSearch={actions.searchTask}/>
      </View>
      <TaskAddForm />
      {

        state.searchText.length>0
        ?
        <View className="flex-row justify-between my-1 items-center">
          <Text className="font-semibold ">Searching result: {state.searchText}</Text>
          <Button title='Clear' onPress={()=>{actions.searchTask('')}}/>
        </View>
        :
        null
      }
      <View className="flex-1 gap-y-2 px-2 border border-gray-200 rounded-lg">
        {state.tasks.map((task, index) => (
          index == editingIdx 
            ?
            <TaskEditCard key={task.id} index={index} />
            :
            <Task key={task.id} index={index} />
        ))}
      </View>
    </ScrollView>
  );
}