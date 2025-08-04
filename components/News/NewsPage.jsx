import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://newsdata.io/api/1/latest?apikey=pub_98a9cbaa720745f69f312fbf356b130e&q=Pune&language=en'
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setNewsList(data.results);
      } else {
        setNewsList([]);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news. Please try again.');
      setNewsList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open this link');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to open link');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <View className="h-[50vh] justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-3 text-gray-600 text-base">Loading latest news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="h-[40vh] justify-center items-center bg-gray-50 px-6">
        <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
          <Text className="text-red-500 text-2xl">⚠️</Text>
        </View>
        <Text className="text-red-600 text-center text-base font-medium mb-3">
          {error}
        </Text>
        <TouchableOpacity
          className="bg-blue-600 px-6 py-3 rounded-lg"
          onPress={fetchNews}
        >
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (newsList.length === 0) {
    return (
      <View className="h-[40vh] justify-center items-center bg-gray-50 px-6">
        <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
          <Text className="text-blue-500 text-2xl">📰</Text>
        </View>
        <Text className="text-gray-600 text-center text-base font-medium mb-3">
          No news available at the moment
        </Text>
        <TouchableOpacity
          className="bg-blue-600 px-6 py-3 rounded-lg"
          onPress={fetchNews}
        >
          <Text className="text-white font-semibold">Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="h-[60vh] mt-6">
      {/* Header */}
      <View className="px-4 mb-4 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-gray-800">Latest News</Text>
        <TouchableOpacity onPress={fetchNews}>
          <Text className="text-blue-600 font-semibold">Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* News Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-auto px-4"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {newsList.map((item, index) => (
          <TouchableOpacity
            key={`${item.article_id || index}`}
            className="w-80 h-full bg-white rounded-2xl shadow-lg mr-4 overflow-hidden"
            onPress={() => handleReadMore(item.link)}
            activeOpacity={0.95}
          >
            {/* Card Header with Image */}
            <View className="relative">
              {item.image_url ? (
                <Image
                  source={{ uri: item.image_url }}
                  className="w-full h-40"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-32 bg-gradient-to-r from-blue-400 to-purple-500 items-center justify-center">
                  <Text className="text-white text-4xl">📰</Text>
                </View>
              )}
              
              {/* Gradient overlay */}
              <View className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Date badge */}
              {item.pubDate && (
                <View className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full">
                  <Text className="text-xs font-medium text-gray-700">
                    {formatDate(item.pubDate)}
                  </Text>
                </View>
              )}
            </View>

            {/* Card Content */}
            <View className="p-4 flex-1 justify-between">
              <View>
                {/* Source */}
                {item.source_id && (
                  <Text className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                    {item.source_id}
                  </Text>
                )}
                
                {/* Title */}
                <Text 
                  className="text-lg font-bold text-gray-800 leading-tight mb-3" 
                  numberOfLines={3}
                >
                  {item.title}
                </Text>
                
                {/* Description */}
                <Text 
                  className="text-sm text-gray-600 leading-relaxed" 
                  numberOfLines={3}
                >
                  {item.description || 'No description available'}
                </Text>
              </View>

              {/* Read More Button */}
              <View className=" border-t border-gray-100">
                <View className="bg-blue-50 px-4 py-3 rounded-xl flex-row items-center justify-between">
                  <Text className="text-blue-700 font-semibold">Read Full Article</Text>
                  <Text className="text-blue-500 text-lg">→</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Bottom indicator */}
      <View className="items-center mt-4">
        <View className="flex-row">
          {newsList.slice(0, 5).map((_, index) => (
            <View
              key={index}
              className="w-2 h-2 bg-gray-300 rounded-full mx-1"
            />
          ))}
        </View>
      </View>
    </View>
  );
}