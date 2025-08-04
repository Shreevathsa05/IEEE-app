import { ScrollView } from 'react-native'
import LocalAlerts from './LocalAlerts'
import NewsPage from './NewsPage'

export default function NewsIndex() {
  return (
    <ScrollView>
      <LocalAlerts/>
      <NewsPage/>
    </ScrollView>
  )
}