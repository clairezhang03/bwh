import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from "./screens/Home"
import Login from './screens/Login'
import Register from './screens/Register' 
import StockInfo from './screens/StockInfo'
import UserProfile from './screens/UserProfile'
import LeaderBoard from './screens/Leaderboard'
import TabNavigator from './TabNavigator'


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeScreen" component={TabNavigator} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="StockInfo" component={StockInfo}/>
            <Stack.Screen name="UserProfile" component={UserProfile}/>
            <Stack.Screen name = "Leaderboard" component={LeaderBoard}/>
        </Stack.Navigator>
        
    )
}

const styles = StyleSheet.create({})


