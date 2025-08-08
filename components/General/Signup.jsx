import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Signup({ setLogged, setName }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const base_url = `https://ieee-hazard-analyzer-latest.onrender.com`;

  const handleSignup = async () => {
    try {
      const res = await fetch(`${base_url}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Error', data.message || 'Signup failed');
        return;
      }

      Alert.alert('Success', 'Account created successfully');
      setName(username);
      setLogged(true);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us today</Text>

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

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
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
  signupButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
