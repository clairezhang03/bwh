import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from './screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Placeholder from './screens/Placeholder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchScreen from './screens/SearchScreen';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        }
        else if (route.name === 'Search') {
          iconName = focused ? 'search' : 'search-outline';
        }
        else if (route.name === "Leaderboard") {
          iconName = focused ? 'trophy' : 'trophy-outline';

        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarStyle:{
        borderTopWidth: 1,
        borderColor: "white",
      },
      
      tabBarActiveTintColor: '#6886d9',
      tabBarInactiveTintColor: 'gray',
    })}>
        <Tab.Screen name = "Home" component={Home} options={{headerShown: false}}/>
        <Tab.Screen name = "Search" component={SearchScreen} options={{headerShown: false}}/>
        <Tab.Screen name = "Leaderboard" component={Placeholder} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({

})