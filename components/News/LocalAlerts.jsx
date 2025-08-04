import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const data = [
  {
    title: 'Water Cut for a Day',
    desc: 'Due to sewage mixture in the main pipeline, water supply will be suspended.',
    date: '2025-08-03',
  },
  {
    title: 'Traffic Diversion at JM Road',
    desc: 'Partial road closures from 10 AM to 6 PM due to metro work.',
    date: '2025-08-04',
  },
  {
    title: 'Power Outage Scheduled',
    desc: 'Maintenance outage in Kothrud area from 9 AM to 1 PM.',
    date: '2025-08-02',
  },
  {
    title: 'Tree Plantation Drive',
    desc: 'Community event at Sarasbaug Garden, 7 AM onwards.',
    date: '2025-08-01',
  },
  {
    title: 'Garbage Pickup Delay',
    desc: 'Garbage trucks will operate late due to staff shortage.',
    date: '2025-08-03',
  }
];

const LocalAlerts = () => {
  const [showAll, setShowAll] = useState(false);

  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= twoDaysAgo && itemDate <= today;
  });

  const displayedData = showAll ? filteredData : filteredData.slice(0, 3);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => setShowAll(prev => !prev)}>
      <View className='p-4 '>
        <Text className='text-xl font-bold mb-2'>Local News/Alerts</Text>
        {displayedData.map((item, index) => (
          <View key={index} className='mb-3 p-3 bg-yellow-100 rounded-xl border-2 shadow-xl'>
            <Text className='font-semibold text-lg'>{item.title}</Text>
            <Text className='text-sm text-gray-700'>{item.desc}</Text>
            <Text className='text-xs text-gray-500 mt-1'>{item.date}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default LocalAlerts;
