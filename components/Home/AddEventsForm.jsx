import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

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
        headers: {
          'Content-Type': 'application/json'
        },
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
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Type (optional)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description *"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD) *"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Location *"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Organizer ID *"
        value={organizerId}
        onChangeText={setOrganizerId}
      />

      <Button title="Add Event" onPress={handleAddEvent} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12
  }
});
