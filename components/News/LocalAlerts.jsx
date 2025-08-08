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
      <View className="p-4 bg-black flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  const displayedData = showAll ? alerts : alerts.slice(0, 3);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => setShowAll(prev => !prev)}
      className="bg-black"
    >
      <View className="p-4">
        <Text className="text-xl font-bold pb-2 text-orange-500">
          Local News / Alerts
        </Text>
        {displayedData.map((item, index) => (
          <View
            key={index}
            className="pb-3 p-3 bg-black rounded-xl border-2 border-orange-500 shadow-lg"
          >
            <Text className="font-semibold text-lg text-orange-400">
              {item.message}
            </Text>
            {item.description && (
              <Text className="text-sm text-orange-300">
                {item.description}
              </Text>
            )}
            <Text className="text-xs text-orange-200 mt-1">
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text className="text-xs text-orange-200">{item.location}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default LocalAlerts;
