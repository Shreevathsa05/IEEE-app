import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './Login';
import Signup from './Signup';

export default function Auth({ isLoggedin, setLoggedin, name, setName, setData }) {
  const [page, setPage] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Tab Buttons */}
      <View className="flex-row justify-center items-center py-4 bg-neutral-900">
        <TouchableOpacity
          className={`px-6 py-2 rounded-lg mx-2 ${page ? 'bg-orange-500' : 'bg-neutral-700'}`}
          onPress={() => setPage(true)}
        >
          <Text className={`text-lg font-bold ${page ? 'text-black' : 'text-white'}`}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-6 py-2 rounded-lg mx-2 ${!page ? 'bg-orange-500' : 'bg-neutral-700'}`}
          onPress={() => setPage(false)}
        >
          <Text className={`text-lg font-bold ${!page ? 'text-black' : 'text-white'}`}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex-1">
        {page ? (
          <Login setLogged={setLoggedin} setName={setName} setData={setData} />
        ) : (
          <Signup setLogged={setLoggedin} setName={setName} />
        )}
      </View>
    </SafeAreaView>
  );
}
