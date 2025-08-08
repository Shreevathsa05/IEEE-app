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
    } catch {
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
      <View className="h-[50vh] justify-center items-center bg-black">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="mt-3 text-orange-400 text-base">Loading latest news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="h-[40vh] justify-center items-center bg-black px-6">
        <View className="w-16 h-16 bg-orange-900 rounded-full items-center justify-center mb-4">
          <Text className="text-orange-400 text-2xl">⚠️</Text>
        </View>
        <Text className="text-orange-500 text-center text-base font-medium mb-3">
          {error}
        </Text>
        <TouchableOpacity
          className="bg-orange-500 px-6 py-3 rounded-lg"
          onPress={fetchNews}
        >
          <Text className="text-black font-semibold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (newsList.length === 0) {
    return (
      <View className="h-[40vh] justify-center items-center bg-black px-6">
        <View className="w-16 h-16 bg-orange-900 rounded-full items-center justify-center mb-4">
          <Text className="text-orange-400 text-2xl">📰</Text>
        </View>
        <Text className="text-orange-400 text-center text-base font-medium mb-3">
          No news available at the moment
        </Text>
        <TouchableOpacity
          className="bg-orange-500 px-6 py-3 rounded-lg"
          onPress={fetchNews}
        >
          <Text className="text-black font-semibold">Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="h-[60vh] pt-6 bg-black">
      {/* Header */}
      <View className="px-4 mb-4 flex-row justify-between items-center">
        <Text className="text-2xl font-bold text-orange-500">Latest News</Text>
        <TouchableOpacity onPress={fetchNews}>
          <Text className="text-orange-400 font-semibold">Refresh</Text>
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
            className="w-80 h-full bg-black rounded-2xl border-2 border-orange-500 mr-4 overflow-hidden"
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
                <View className="w-full h-32 bg-orange-900 items-center justify-center">
                  <Text className="text-orange-400 text-4xl">📰</Text>
                </View>
              )}

              {/* Dark overlay for readability */}
              <View className="absolute inset-0 bg-black/20" />

              {/* Date badge */}
              {item.pubDate && (
                <View className="absolute top-3 right-3 bg-orange-500/90 px-2 py-1 rounded-full">
                  <Text className="text-xs font-medium text-black">
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
                  <Text className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-2">
                    {item.source_id}
                  </Text>
                )}

                {/* Title */}
                <Text
                  className="text-lg font-bold text-orange-500 leading-tight mb-3"
                  numberOfLines={3}
                >
                  {item.title}
                </Text>

                {/* Description */}
                <Text
                  className="text-sm text-orange-300 leading-relaxed"
                  numberOfLines={3}
                >
                  {item.description || 'No description available'}
                </Text>
              </View>

              {/* Read More Button */}
              <View className="border-t border-orange-500 mt-3">
                <View className="bg-orange-500 px-4 py-3 rounded-xl flex-row items-center justify-between mt-2">
                  <Text className="text-black font-semibold">Read Full Article</Text>
                  <Text className="text-black text-lg">→</Text>
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
              className="w-2 h-2 bg-orange-500 rounded-full mx-1"
            />
          ))}
        </View>
      </View>
    </View>
  );
}
