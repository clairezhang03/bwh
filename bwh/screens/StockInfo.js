import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function StockInfo() {
    return (
        <View style={styles.background}>
            <SafeAreaView>
                <View style={styles.topFormat}>
                    <Text style={styles.tickerText}>StockInfo</Text>
                    <View>
                        <Text style={styles.priceText}>$100</Text>
                        <Text style={styles.percentText}>100%</Text>
                    </View>
                </View>
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
        color: "#FDF1D2",
    },
    priceText: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
        marginTop: 30,
        marginRight: 20,
    },
    topFormat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },
    percentText: {
        fontSize: 20,
        fontWeight: "bold",
    },
})