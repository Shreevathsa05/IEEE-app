import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import "./global.css";

import Header from "../components/Header";

export default function RootLayout() {
  return (
  <>
  <Header/>

  <Tabs screenOptions={{headerShown:false}} >

    <Tabs.Screen 
    name="index"
    options={{
      title: 'Home',
      tabBarIcon: ({color,size}) => <Ionicons name='home' color={color} size={size} />
    }}
    />

    <Tabs.Screen 
    name="News"
    options={{
      title: 'News',
      tabBarIcon: ({color,size}) => <Ionicons name='newspaper-outline' color={color} size={size} />
    }}
    />

    <Tabs.Screen 
    name="CarbonFootPrint"
    options={{
      title: 'Community',
      tabBarIcon: ({color,size}) => <Ionicons name='people' color={color} size={size} />
    }}
    />

    
    <Tabs.Screen 
    name="Maps"
    options={{
      title: 'Maps',
      tabBarIcon: ({color,size}) => <Ionicons name='location' color={color} size={size} />
    }}
    />

     <Tabs.Screen 
    name="Report"
    options={{
      title: 'Report',
      tabBarIcon: ({color,size}) => <Ionicons name='camera' color={color} size={size} />
    }}
    />

  </Tabs>
  </>
  );
}

