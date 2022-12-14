import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useAuthState } from '../core/authstate';
import { db } from '../core/config';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import useSWR from "swr"

export default function Card(props) {
    const navigation = useNavigation();
    const uid = useAuthState();
    const fetcher = (url) => fetch(url).then((r) => r.json())
    const stockData = useSWR(`https://finnhub.io/api/v1/quote?symbol=${props.symbol}&token=cdp0asaad3i3u5gonhhgcdp0asaad3i3u5gonhi0`, fetcher, { refreshInterval: 10000 });


    let buttonColor = "#F9FFEF";
    let textColor = "#06A77D";
    if (stockData.data?.dp < 0) {
        buttonColor = "#FFF1EA";
        textColor = "#D00000";
    }

    const addToWatchList = (tickerSymbol) => {
        updateDoc(doc(db, "users", uid), {
            watchlist: arrayUnion(tickerSymbol),
        }).then(() => {
        }).catch((e) => console.log(e));
    }

    return (
        <View>
            <TouchableOpacity 
            style={[styles.button, {backgroundColor: buttonColor}]}
            onPress={() => navigation.navigate("StockInfo", {data: {symbol: props.symbol,  description: props.description}}) }
            >
                <View style={styles.textFormat}>
                    <View>
                        <Text numberOfLines={1} style={[styles.tickerText, {color: textColor}]}>{props.symbol}</Text>
                        <Text numberOfLines={1} style={[styles.nameText, {color: textColor}]}>{props.description}</Text>
                    </View>
                    <View>
                        <Text style={styles.priceText}>${stockData.data?.c}</Text>
                        <Text style={[styles.percentText, {color: textColor}]}>{(stockData.data?.dp>0? "+":"") + stockData.data?.dp}%</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View> 
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 20,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    textFormat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },
    tickerText: {
        fontSize: 30,
        fontWeight: "bold",
        flex: 1
    },
    nameText: {
        fontSize: 15,
        fontWeight: "bold",
        flex: 1
    },
    priceText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
    },
    percentText: {
        fontSize: 20,
    },
})