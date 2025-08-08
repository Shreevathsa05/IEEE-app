import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from 'react-native';
import AddEventsForm from '../components/Home/AddEventsForm';

export default function User() {
  const { name, data } = useLocalSearchParams();
  const base_url = `https://ieee-hazard-analyzer-latest.onrender.com`;

  return (
    <ScrollView className="flex-1 bg-black">
      <Text className="text-4xl p-4 font-bold text-orange-500">Profile:</Text>

      <View className="flex justify-center items-center h-20vh w-full pt-8">
        <Text className="h-auto text-4xl pb-4">🧑</Text>
        <Text className="h-auto text-2xl pb-2 text-orange-400">{name}</Text>
        <Text className="h-auto text-2xl pb-2 text-orange-300">
          {data?.user?.credits || 0} Credits
        </Text>
        <Text className="h-auto text-2xl pb-8 text-orange-300">
          {data?.user?.badges?.join(", ") || "[no badges yet]"}
        </Text>
        <View className="bg-orange-500 w-[80vw] h-[0.4vh] rounded-full"></View>
      </View>

      <AddEventsForm />
    </ScrollView>
  );
}
