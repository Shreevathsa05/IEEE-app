import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login({ setLogged, setName, setData }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const base_url = `https://ieee-hazard-analyzer-latest.onrender.com`;

  const handleLogin = async () => {
    try {
      const res = await fetch(`${base_url}/login/${username}/${password}`);

      if (!res.ok) {
        const errorText = await res.text();
        Alert.alert('Error', errorText || 'Login failed');
        return;
      }

      const data = await res.json();
      setName(username);
      setData(data);
      setLogged(true);
      Alert.alert('Success', 'Logged in successfully');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#FFA500', // Orange
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFA500',
    backgroundColor: '#111',
    color: '#fff',
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
