import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from "../components/Header"
export default function Home() {
    return (
        <View style={styles.background}>
            <SafeAreaView>
                <ScrollView>
                    <Header name="BWH" value={100000} percent={100}/>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerText: {
        color: "red"
    },
    background: {
        backgroundColor: "#00284D"
    
    }
})