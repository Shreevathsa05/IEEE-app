import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Header() {
  return (
    <SafeAreaView className='flex-row justify-start items-center p-4 bg-black border-orange-500 border-b-2 rounded-xl'>
      <View className='w-[50px] h-[50px] mr-3'>
        <Image
          source={require('./General/Logo.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      </View>
      <View className='flex-1 items-center'>
        <Text className='text-2xl text-orange-500 font-bold'>SaarthiX</Text>
      </View>
    </SafeAreaView>
  )
}
