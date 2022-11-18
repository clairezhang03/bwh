import { SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView, View, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { useAuthState } from '../core/authstate';
import { db } from '../core/config';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import useSWR from "swr"

export default function StockInfo() {
    const route = useRoute();
    const uid = useAuthState();
    const { data } = route.params;
    const fetcher = (url) => fetch(url).then((r) => r.json())
    const stockData = useSWR(`https://finnhub.io/api/v1/quote?symbol=${data.symbol}&token=cdp0asaad3i3u5gonhhgcdp0asaad3i3u5gonhi0`, fetcher, { refreshInterval: 1000 });

    const addToWatchList = (tickerSymbol) => {
        updateDoc(doc(db, "users", uid), {
            watchlist: arrayUnion(tickerSymbol),
        }).then(() => {
        }).catch((e) => console.log(e));
    }

    return (
        <View style={styles.background}>
            <SafeAreaView>
                <View style={styles.topFormat}>
                    <Text style={styles.tickerText}>{data.symbol}</Text>
                    <View>
                        <Text style={styles.priceText}>${stockData.data?.c}</Text>
                        <Text style={[styles.percentText, stockData.data?.dp >= 0 ? styles.percentInc : styles.percentDec]}>
                            {stockData.data?.dp}%
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => addToWatchList(data.symbol)}
                >
                    <Image style={styles.heart} source={require('./assets/heart.png')} />
                </TouchableOpacity>
            </SafeAreaView>

            <SafeAreaView>
                <View style={styles.detailsFormat}>
                    <View>
                        <Text style={styles.detailsText}>High Price of the Day:</Text>
                        <Text style={styles.detailsText}>Low Price of the Day:</Text>
                        <Text style={styles.detailsText}>Open Price of the Day:</Text>
                        <Text style={styles.detailsText}>Previous Close Price:</Text>
                    </View>
                    <View>
                        <Text style={styles.numbersText}>${stockData.data?.h.toFixed(2)}</Text>
                        <Text style={styles.numbersText}>${stockData.data?.l.toFixed(2)}</Text>
                        <Text style={styles.numbersText}>${stockData.data?.o.toFixed(2)}</Text>
                        <Text style={styles.numbersText}>${stockData.data?.pc.toFixed(2)}</Text>
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
    detailsText: {
        fontSize: 20,
        color: "#FDF1D2", 
        marginLeft: 30,
        fontWeight: "bold",
        marginBottom:16.5,
    },
    numbersText: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        marginBottom:10,
    },
    topFormat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },
    detailsFormat: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-between",
        marginRight: 30,
        marginTop: 30,
    },
    percentText: {
        fontSize: 25,
        fontWeight: "bold",
    },

    percentInc: {
        color: "#06A77D",
    },

    percentDec: {
        color: "#D00000",
    },
    favoriteButton: {
        marginLeft: 50,
    }
})