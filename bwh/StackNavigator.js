import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from "./screens/Home"
import Login from './screens/Login';
import StockInfo from './screens/StockInfo';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="StockInfo" component={StockInfo}/>
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({})


