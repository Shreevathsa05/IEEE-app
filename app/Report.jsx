import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

const Report = () => {
  const [media, setMedia] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [phone, setPhone] = useState('');

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'Camera access is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setMedia(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !desc || !phone || !media) {
      Alert.alert('Incomplete', 'Please fill all fields and add a photo/video.');
      return;
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: desc,
          phone,
          mediaUri: media.uri,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Report submitted successfully!');
        setTitle('');
        setDesc('');
        setPhone('');
        setMedia(null);
      } else {
        Alert.alert('Error', 'Failed to submit report.');
      }
    } catch (err) {
      Alert.alert('Network Error', 'Could not submit report.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#fff7ed] p-4">
      <Text className="text-xl font-bold mb-4 text-center">
        Report accidents / garbage / potholes / problems...
      </Text>

      <TouchableOpacity
        onPress={openCamera}
        className="bg-amber-300 py-3 px-4 rounded-xl mb-4"
      >
        <Text className="text-center font-semibold text-gray-800">
          📷 Take Photo / Video
        </Text>
      </TouchableOpacity>

      {media && (
        <Image
          source={{ uri: media.uri }}
          className="w-full h-48 rounded-xl mb-4"
        />
      )}

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        className="bg-white p-3 mb-3 rounded-xl border border-gray-300"
      />

      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        multiline
        className="bg-white p-3 mb-3 rounded-xl border border-gray-300 h-24 text-base"
      />

      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        className="bg-white p-3 mb-4 rounded-xl border border-gray-300"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-600 py-4 rounded-xl"
      >
        <Text className="text-white text-center font-bold text-lg">Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Report;
