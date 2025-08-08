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
        <ScrollView className='flex-col min-h-screen' >
            <Text className='pt-4 pl-4 text-2xl font-extrabold '>Analytics</Text>
            {/* Section demographics */}
            <View className='rounded h-[20vh] w-full flex-row justify-around items-center'>
                <View className='w-[40%] h-[60%] p-8 px-2 bg-orange-300 rounded-xl shadow-lg border-2'>
                    <View><Text className='font-bold text-xl '>Recent Reports</Text></View>
                    <View><Text>12</Text></View>
                </View>
                <View className='w-[44%] h-[60%] py-8 px-2 bg-orange-300 rounded-lg shadow-lg border-2'>
                    <Text className='font-bold text-xl '>Upcoming Events</Text>
                    <Text>5 +</Text>
                </View>
            </View>



            {/* Section Carbon footprint saved */}
            {/* get C emissions saved,
          pass on to gemini , 
          get quote,
          add it to section below  
      */}
            {/* <View className='h-auto w-full flex justify-center items-center'>
                <Text className='text-center p-4 rounded-sm border-2 m-4' style={customStyle.textCarbon}>You saved 18% carbon — that’s like saving 1 tree🌱!</Text>
            </View> */}



            {/* news marquee */}
            {/* <View className='mt-8 rounded-xl bg-[#ffe1a8] min-h-20 p-2'>
                {loading ? (<ActivityIndicator size="small" color="#fff" />) : (
                <Text className='font-semibold transform-cpu'>
                    Recent News:{'\n\n'}
                    {newsText}</Text>
                )}
            </View> */}
<CommunityEvents />


            {/* Quick links */}
            <View className='min-h-20vh flex-col p-4'>
                <Text className='text-2xl font-bold underline'>Quick Links..</Text>
                <View className="flex-row justify-around pt-8">
                    <TouchableOpacity
                        className="rounded-xl bg-red-400 px-4 py-2"
                        onPress={() => router.navigate('/Report')}
                    >
                        <Text className="text-white font-semibold text-lg">Report Issue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="rounded-xl bg-green-500 px-4 py-2"
                        onPress={() => router.navigate('/CarbonFootPrint')}
                    >
                        <Text className="text-white font-semibold text-lg">Join Events</Text>
                    </TouchableOpacity>
                </View>


                <View className="flex-row justify-around p-8">
                    <TouchableOpacity
                        className="rounded-xl bg-green-400 px-4 py-2"
                        onPress={() => router.navigate('/Maps')}
                    >
                        <Text className="text-white font-semibold text-lg">📍 Map</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="rounded-xl bg-green-500 px-4 py-2"
                        onPress={() => router.navigate('/News')}
                    >
                        <Text className="text-white font-semibold text-lg">News</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    )
}

const customStyle = StyleSheet.create({
    textCarbon: {
        backgroundColor: '#dee2e6',
        borderRadius: 7,
        color: 'black',
    },
    top: {
        backgroundColor: '#f8f9fa'
    }
});