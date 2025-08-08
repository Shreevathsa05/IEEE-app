import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CommunityEvents from './CommunityEvents';

export default function Home() {
    const [newsText, setNewsText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://newsdata.io/api/1/latest?apikey=pub_98a9cbaa720745f69f312fbf356b130e&q=Pune&language=en')
            .then(res => res.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    setNewsText(`Pune News: ${data.results[0].title}`);
                } else {
                    setNewsText('No news found for Pune.');
                }
            })
            .catch(() => {
                setNewsText('Error fetching news.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <ScrollView className="flex-col min-h-screen bg-black">
            <Text className="pt-4 pl-4 text-2xl font-extrabold text-orange-400">Analytics</Text>

            {/* Analytics Cards */}
            <View className="rounded h-[20vh] w-full flex-row justify-around items-center">
                <View className="w-[40%] h-[60%] p-8 px-2 bg-[#1a1a1a] border border-orange-500 rounded-xl shadow-lg">
                    <Text className="font-bold text-xl text-orange-400">Recent Reports</Text>
                    <Text className="text-gray-300">12</Text>
                </View>
                <View className="w-[44%] h-[60%] py-8 px-2 bg-[#1a1a1a] border border-orange-500 rounded-lg shadow-lg">
                    <Text className="font-bold text-xl text-orange-400">Upcoming Events</Text>
                    <Text className="text-gray-300">5 +</Text>
                </View>
            </View>

            {/* Optional Carbon Footprint Saved */}
            {/* <View className="h-auto w-full flex justify-center items-center">
                <Text className="text-center p-4 rounded-sm border-2 border-orange-500 m-4 text-gray-300 bg-[#1a1a1a]">
                    You saved 18% carbon — that’s like saving 1 tree🌱!
                </Text>
            </View> */}

            {/* News Section */}
            {/* <View className="mt-8 rounded-xl bg-[#1a1a1a] min-h-20 p-2 border border-orange-500">
                {loading ? (
                    <ActivityIndicator size="small" color="#FFA500" />
                ) : (
                    <Text className="font-semibold text-orange-400">
                        Recent News:{'\n\n'}
                        <Text className="text-gray-300">{newsText}</Text>
                    </Text>
                )}
            </View> */}

            <CommunityEvents />

            {/* Quick Links */}
            <View className="min-h-20vh flex-col p-4">
                <Text className="text-2xl font-bold underline text-orange-400">Quick Links..</Text>

                <View className="flex-row justify-around pt-8">
                    <TouchableOpacity
                        className="rounded-xl bg-orange-500 px-4 py-2"
                        onPress={() => router.navigate('/Report')}
                    >
                        <Text className="text-white font-semibold text-lg">Report Issue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="rounded-xl bg-orange-400 px-4 py-2"
                        onPress={() => router.navigate('/CarbonFootPrint')}
                    >
                        <Text className="text-white font-semibold text-lg">Join Events</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-around p-8">
                    <TouchableOpacity
                        className="rounded-xl bg-orange-500 px-4 py-2"
                        onPress={() => router.navigate('/Maps')}
                    >
                        <Text className="text-white font-semibold text-lg">📍 Map</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="rounded-xl bg-orange-400 px-4 py-2"
                        onPress={() => router.navigate('/News')}
                    >
                        <Text className="text-white font-semibold text-lg">News</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const customStyle = StyleSheet.create({
    textCarbon: {
        backgroundColor: '#1a1a1a',
        borderRadius: 7,
        color: '#FFA500',
        borderWidth: 1,
        borderColor: '#FFA500',
    },
    top: {
        backgroundColor: '#000'
    }
});
