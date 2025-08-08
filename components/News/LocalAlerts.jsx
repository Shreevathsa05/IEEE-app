import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const LocalAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const base_url = `https://ieee-hazard-analyzer-latest.onrender.com`;

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch(`${base_url}/local-alerts`);
        const data = await res.json();
        setAlerts(data);
      } catch (err) {
        console.error('Failed to fetch alerts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <View className="p-4">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const displayedData = showAll ? alerts : alerts.slice(0, 3);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => setShowAll(prev => !prev)}>
      <View className="p-4">
        <Text className="text-xl font-bold mb-2">Local News/Alerts</Text>
        {displayedData.map((item, index) => (
          <View key={index} className="mb-3 p-3 bg-yellow-100 rounded-xl border-2 shadow-xl">
            <Text className="font-semibold text-lg">{item.message}</Text>
            {item.description && (
              <Text className="text-sm text-gray-700">{item.description}</Text>
            )}
            <Text className="text-xs text-gray-500 mt-1">
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text className="text-xs text-gray-500">{item.location}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default LocalAlerts;
