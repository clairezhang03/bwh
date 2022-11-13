import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from './screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Placeholder from './screens/Placeholder';
import SearchScreen from './screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
        <Tab.Screen name = "Home" component={Home} options={{headerShown: false}}/>
        <Tab.Screen name = "Search" component={SearchScreen} options={{headerShown: false}}/>
        <Tab.Screen name = "Leaderboard" component={Placeholder} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({

})