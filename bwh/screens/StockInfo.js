import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function StockInfo() {
    return (
        <View style={styles.background}>
            <SafeAreaView>
                <Text style={styles.tickerText}>StockInfo</Text>  
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#00284D",
        flex: 1,
    },
    tickerText: {
        fontSize: 40,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20,
    },
})