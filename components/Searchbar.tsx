import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import SearchIcon from '@/components/icons/SearchIcon';

interface SearchBarProps {
  handleSearch?: (value: string) => void; // Optional search handler
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch = () => {} }) => {
  const [searchValue, setSearchValue] = useState<string>(''); // State to track input value

  const handleButtonPress = (): void => {
    handleSearch(searchValue.trim()); // Trigger the search action with trimmed input
    Keyboard.dismiss(); // Dismiss the keyboard after searching
  };

  return (
    <View className="flex-row min-w-52 items-center bg-white rounded-full p-1 shadow-md">
      <TextInput
        value={searchValue} // Bind the state to the input
        onChangeText={(text: string) => setSearchValue(text)} // Update state on text change
        className="flex-1 text-sm p-2 bg-gray-100 text-gray-900 rounded-full"
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        returnKeyType="search"
      />
      <TouchableOpacity
        className="bg-gray-600 p-2 rounded-full ml-2"
        onPress={handleButtonPress} // Trigger the search action on button press
        accessibilityLabel="Search button"
      >
        <SearchIcon size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;