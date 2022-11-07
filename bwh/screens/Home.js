import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from "../components/Header"
import Card from "../components/Card"
import { useNavigation } from '@react-navigation/native'

export default function Home() {
    return (
        <View style={styles.background}>
            <SafeAreaView>
                <Header name="BWH" value={100000} percent={100} />
                <Text style={styles.favText}>Wishlist</Text>
                <ScrollView>
                    <Card tickerSymbol="SPOT" name="Spotify" percentChange={-12} stockPrice={63} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
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
        backgroundColor: "#00284D",
    },
    favText: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
    },
})