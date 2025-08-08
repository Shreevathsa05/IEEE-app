import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Auth from '../components/General/Auth';
import "./global.css";

import { useState } from "react";
import Header from "../components/Header";

export default function RootLayout() {
  // default must be false
  const [isLoggedin, setLoggedin] = useState(false);
  const [name, setName] = useState();
  const [data, setData] = useState();

  return (
    !isLoggedin
      ? <Auth
          isLoggedin={isLoggedin}
          setLoggedin={setLoggedin}
          name={name}
          setName={setName}
          setData={setData}
        />
      : <>
          <Header />
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#FFA500", // Orange when active
              tabBarInactiveTintColor: "#ccc", // Light gray when inactive
              tabBarStyle: {
                backgroundColor: "#000", // Black background
                borderTopWidth: 1,
                borderTopColor: "#FFA500", // Orange border top
                paddingBottom: 4,
                height: 60
              },
              tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: "bold"
              }
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='home' color={color} size={size} />
                )
              }}
            />

            <Tabs.Screen
              name="News"
              options={{
                title: 'News',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='newspaper-outline' color={color} size={size} />
                )
              }}
            />

            <Tabs.Screen
              name="Maps"
              options={{
                title: 'Maps',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='location' color={color} size={size} />
                )
              }}
            />

            <Tabs.Screen
              name="Report"
              options={{
                title: 'Report',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='camera' color={color} size={size} />
                )
              }}
            />

            <Tabs.Screen
              name="User"
              options={{
                title: 'User',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='person' color={color} size={size} />
                )
              }}
              initialParams={{ name, data }}
            />
          </Tabs>
        </>
  );
}
