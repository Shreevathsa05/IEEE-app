import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Header() {
  return (
    <SafeAreaView className='flex-row justify-start p-4 border-black border-b-2 rounded-xl'>
        <View className='w-[20%] h-auto '>
            <Ionicons name='home' size={20}></Ionicons>
        </View>
        <View className='flex justify-center items-center '>
            <Text className='text-2xl'>SaarthiX</Text>
        </View>
    </SafeAreaView>
  )
}