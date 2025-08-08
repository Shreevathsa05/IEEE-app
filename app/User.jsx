import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AddEvent from '../components/Home/AddEventsForm'; // make sure the path is correct

export default function User() {
  const [showAddEvent, setShowAddEvent] = useState(false);

  if (showAddEvent) {
    return <AddEvent />;
  }

  return (
    <View className="flex-1">
      <Text>User</Text>

      <TouchableOpacity
        onPress={() => setShowAddEvent(true)}
        className="absolute bottom-5 right-5 bg-blue-600 w-14 h-14 rounded-full justify-center items-center shadow-lg"
      >
        <Text className="text-white text-3xl font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
}
