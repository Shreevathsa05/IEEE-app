import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './Login';
import Signup from './Signup';

export default function Auth({ isLoggedin, setLoggedin, name, setName,setData }) {
  const [page, setPage] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Login" onPress={() => setPage(true)} />
        </View>
        <View style={styles.button}>
          <Button title="Signup" onPress={() => setPage(false)} />
        </View>
      </View>
      {page ? (
        <Login setLogged={setLoggedin} setName={setName} setData={setData} />
      ) : (
        <Signup setLogged={setLoggedin} setName={setName} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor:'gray'
  },
  button: {
    marginHorizontal: 10,
  },
});