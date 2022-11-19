import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useRoute} from '@react-navigation/native';
import { useAuthState } from '../core/authstate';
import { db } from '../core/config';
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import useSWR from "swr"

export default function StockInfo() {
    const route = useRoute();
    const uid = useAuthState();
    const [userDoc, setUserDoc] = useState(null);
    const { data } = route.params;
    const fetcher = (url) => fetch(url).then((r) => r.json())
    const stockData = useSWR(`https://finnhub.io/api/v1/quote?symbol=${data.symbol}&token=cdp0asaad3i3u5gonhhgcdp0asaad3i3u5gonhi0`, fetcher, { refreshInterval: 1000 });
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // const subscriber = onAuthStateChanged(auth, checkAuthState);
        // return subscriber; 
        getDoc(doc(db, "users", uid)).then((snapShot) => {
            setUserDoc(snapShot.data())
        }).catch((e) => alert(e))
    });

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

    const pressedLiked = () => {
        console.log(stockObject);
        if (!liked) {
            addToWatchList(stockObject);
        } else {
            removeFromWatchList(stockObject);
        }
    }

    const stockObject = {
        tickerSymbol: data.symbol,
        description: data.description,
    };

    if (userDoc?.watchlist.includes(stockObject)) {
        console.log('in watchlist already');
        setLiked(true);
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
                    onPress={() => pressedLiked()}
                >
                    <Image style={styles.heart} source={require('./assets/heart.png')} />
                </TouchableOpacity>
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