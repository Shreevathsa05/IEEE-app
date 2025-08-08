import { ScrollView } from 'react-native'
import NewsIndex from '../components/News/NewsIndex'
export default function News() {
  return (
    <ScrollView className='min-h-screen'>
      <NewsIndex/>
    </ScrollView>
  )
}