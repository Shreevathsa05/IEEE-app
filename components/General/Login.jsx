import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

export default function Login({ setLogged, setName, setData }) {
  const [name, setLocalName] = useState('');
  const [password, setPassword] = useState('');
  const base_url = `https://ieee-hazard-analyzer-latest.onrender.com`;

  const handleLogin = async () => {
    try {
      const res = await fetch(`${base_url}/login/${name}/${password}`);
      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Error', data || 'Login failed');
        return;
      }
      setName(name);
      setData(data)
      setLogged(true);
      Alert.alert('Success', 'Logged in successfully');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={name}
        onChangeText={setLocalName}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
