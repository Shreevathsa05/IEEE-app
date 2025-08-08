import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function AddEvent() {
  const base_url = `https://ieee-hazard-analyzer-latest.onrender.com`;

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [organizerId, setOrganizerId] = useState('');

  const handleAddEvent = async () => {
    if (!title || !description || !date || !location || !organizerId) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch(`${base_url}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type,
          description,
          image_url: imageUrl,
          date,
          location,
          organizer_id: organizerId
        })
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', 'Event added successfully!');
        console.log('Event created:', data);

        // Reset form
        setTitle('');
        setType('');
        setDescription('');
        setImageUrl('');
        setDate('');
        setLocation('');
        setOrganizerId('');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to add event.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add Community Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Title *"
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Type (optional)"
        placeholderTextColor="#ccc"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description *"
        placeholderTextColor="#ccc"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL (optional)"
        placeholderTextColor="#ccc"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD) *"
        placeholderTextColor="#ccc"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Location *"
        placeholderTextColor="#ccc"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Organizer ID *"
        placeholderTextColor="#ccc"
        value={organizerId}
        onChangeText={setOrganizerId}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
        <Text style={styles.buttonText}>Add Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000', // black background
    flexGrow: 1
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500', // orange
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFA500',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    color: '#fff', // white text
    backgroundColor: '#1a1a1a'
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  }
});
