// import MapView from '../components/General/MapView'
import { WebView } from 'react-native-webview';

export default function Maps() {
  return (
    <WebView 
    source={{uri: 'https://www.google.co.in/maps'}}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
    >
</WebView>
  )
}

// http://192.168.56.1:3000
// https://www.google.co.in/maps