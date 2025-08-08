import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

export default function CommunityEvents() {
  const base_url = `https://ieee-hazard-analyzer-latest.onrender.com`;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${base_url}/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);



  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-gray-600 mt-2">Loading events...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="p-4 ">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Community Events
        </Text>

        {events.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-gray-500">No events available</Text>
          </View>
        ) : (
          events.map(event => (
            <View
              key={event._id}
              className="bg-white rounded-xl shadow-md mb-4 overflow-hidden"
            >
              {event.image_url ? (
                <Image
                  source={{ uri: event.image_url }}
                  className="w-full h-44"
                />
              ) : null}

              <View className="p-3">
                <Text className="text-lg font-bold text-blue-600">
                  {event.title}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  {new Date(event.date).toLocaleDateString()}
                </Text>
                <Text className="text-sm text-gray-400">
                  {event.location}
                </Text>
                <Text className="text-gray-700 mt-2">
                  {event.description}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Add Button */}
      
    </View>
  );
}
