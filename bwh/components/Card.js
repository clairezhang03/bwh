import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useAuthState } from '../core/authstate';
import { db } from '../core/config';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function Card(props) {
    const navigation = useNavigation();
    const uid = useAuthState();

    let buttonColor = "#F9FFEF";
    let textColor = "#06A77D";
    if (props.percentChange < 0) {
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
            onPress={() => /*addToWatchList(props.tickerSymbol){*/ navigation.navigate("StockInfo", {tickerSymbol: props.tickerSymbol, name: props.name, stockPrice: props.stockPrice, percentChange: props.percentChange}) }
            >
                <View style={styles.textFormat}>
                    <View>
                        <Text style={[styles.tickerText, {color: textColor}]}>{props.tickerSymbol}</Text>
                        <Text style={[styles.nameText, {color: textColor}]}>{props.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.priceText}>${props.stockPrice}</Text>
                        <Text style={[styles.percentText, {color: textColor}]}>{(props.percentChange>0? "+":"") + props.percentChange}%</Text>
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
    },
    nameText: {
        fontSize: 15,
        fontWeight: "bold",

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