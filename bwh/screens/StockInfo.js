import { SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { useAuthState } from '../core/authstate';
import { db } from '../core/config';
import { doc, updateDoc, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";
import useSWR from "swr"
import Chart from '../components/Chart'

export default function StockInfo() {
    const route = useRoute();
    const uid = useAuthState();
    const { data } = route.params;
    const [userDoc, setUserDoc] = useState(null);
    const fetcher = (url) => fetch(url).then((r) => r.json())
    const stockData = useSWR(`https://finnhub.io/api/v1/quote?symbol=${data.symbol}&token=cdp0asaad3i3u5gonhhgcdp0asaad3i3u5gonhi0`, fetcher, { refreshInterval: 10000 });
    const [userWatchlist, setUserWatchlist] = useState(null);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
            setUserDoc(doc.data()); 
            setUserWatchlist(doc.data().watchlist);
        }); 
        return unsub; 
    }, [])

    const addToWatchList = (stockObject) => {
        updateDoc(doc(db, "users", uid), {
            watchlist: arrayUnion(stockObject),
        }).then(() => {
        }).catch((e) => console.log(e));
    }

    const removeFromWatchList = (stockObject) => {
        updateDoc(doc(db, "users", uid), {
            watchlist: arrayRemove(stockObject),
        }).then(() => {
        }).catch((e) => console.log(e));
    }

    const stockObject = {
        tickerSymbol: data.symbol,
        description: data.description,
    };

    const checkLiked = (watchlist) => {
        if(watchlist !== null) {
            for (let i = 0; i < watchlist.length; i++) {
                if (watchlist[i].tickerSymbol === stockObject.tickerSymbol) {
                    //setLiked(true)
                    console.log(stockObject);
                    removeFromWatchList(stockObject);
                    console.log('removed');
                    return;
                }
            }
            addToWatchList(stockObject);
            //setLiked(false);
        } 
    }

    if (stockData.data?.h === undefined) {
        return (
            <View style={styles.background}>
                <SafeAreaView>
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>loading data...</Text>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
    else {
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
                        onPress={() => checkLiked(userWatchlist)}
                    >
                        <Image style={styles.heart} source={require('./assets/heart.png')} />
                    </TouchableOpacity>
                </SafeAreaView>
    
                <View>
                    <Chart
                        stock={data.symbol}
                    />
                </View>
    
    
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
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: "#00284D",
        flex: 1,
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        height:"100%"
    },
    loadingText:{
        fontSize:40,
        color: "white",
        fontWeight: "bold",
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
        marginBottom: 16.5,
    },
    numbersText: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        marginBottom: 10,
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