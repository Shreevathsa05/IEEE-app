import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

const report_url = 'https://ieee-hazard-analyzer-latest.onrender.com/api/report';

const Report = () => {
  const [media, setMedia] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(null);

  // Request location permission and fetch current position
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'Camera access is required.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setMedia(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !desc || !phone || !media || !media.base64) {
      Alert.alert('Incomplete', 'Please fill all fields and take a photo.');
      return;
    }

    try {
      const response = await fetch(report_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: desc,
          phone,
          image: media.base64,
          location: location
            ? `${location.latitude},${location.longitude}`
            : 'unknown',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Report submitted successfully!');
        setTitle('');
        setDesc('');
        setPhone('');
        setMedia(null);
        setLocation(null);
      } else {
        Alert.alert('Error', data.message || 'Failed to submit report.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Network Error', 'Could not submit report.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-black p-4">
      <Text className="text-xl font-bold mb-4 text-center text-orange-500">
        Report accidents / garbage / potholes / problems...
      </Text>

      <TouchableOpacity
        onPress={openCamera}
        className="bg-orange-500 py-3 px-4 rounded-xl mb-4"
      >
        <Text className="text-center font-semibold text-black">
          📷 Take Photo
        </Text>
      </TouchableOpacity>

      {media && (
        <Image
          source={{ uri: media.uri }}
          className="w-full h-48 rounded-xl mb-4 border-2 border-orange-500"
        />
      )}

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#f97316"
        className="bg-black text-orange-500 p-3 mb-3 rounded-xl border border-orange-500"
      />

      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        multiline
        placeholderTextColor="#f97316"
        className="bg-black text-orange-500 p-3 mb-3 rounded-xl border border-orange-500 h-24 text-base"
      />

      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor="#f97316"
        className="bg-black text-orange-500 p-3 mb-4 rounded-xl border border-orange-500"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-orange-500 py-4 rounded-xl"
      >
        <Text className="text-black text-center font-bold text-lg">
          Submit Report
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Report;
