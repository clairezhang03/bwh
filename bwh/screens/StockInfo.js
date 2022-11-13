import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Header from "../components/Header"


export default function StockInfo() {
    const routes = useRoute();
    return (
        <View style={styles.background}>
            <SafeAreaView>
                <View style={styles.topFormat}>
                    <Text style={styles.tickerText}>{routes.params.tickerSymbol}</Text>
                    <View>
                        <Text style={styles.priceText}>${routes.params.stockPrice}</Text>
                        <Text style={[styles.percentText, routes.params.percentChange > 0 ? styles.percentInc : styles.percentDec]}>
                            {routes.params.percentChange}%
                             {/* YO FIX THIS */}
                        </Text>
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
        fontSize: 25,
        fontWeight: "bold",
    },

    percentInc:{
        color: "#06A77D",
    },

    percentDec:{
        color: "#D00000", 
    },
})