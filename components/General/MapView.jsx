import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const MapView = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.google.co.in/maps?entry=ml' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapView;
