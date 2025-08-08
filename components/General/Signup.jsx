import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

export default function Signup({ setLogged, setName }) {
  const [name, setLocalName] = useState('');
  const [password, setPassword] = useState('');
  const base_url = `https://ieee-hazard-analyzer-latest.onrender.com`;
  const handleSignup = async () => {
    try {
      const res = await fetch(`${base_url}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Error', data.message || 'Signup failed');
        return;
      }

      Alert.alert('Success', 'Account created successfully');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Signup</Text>
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
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
