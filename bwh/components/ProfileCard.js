

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import useSWR from "swr"
import { useNavigation } from '@react-navigation/native';



export default function ProfileCard(props) {
    const navigation = useNavigation();

    const fetcher = (url) => fetch(url).then((r) => r.json())
    const stockData = useSWR(`https://finnhub.io/api/v1/quote?symbol=${props.ticker}&token=cdp0asaad3i3u5gonhhgcdp0asaad3i3u5gonhi0`, fetcher, { refreshInterval: 10000 });

    let buttonColor = "#F9FFEF";
    let textColor = "#06A77D";
    if (stockData.data?.dp < 0) {
        buttonColor = "#FFF1EA";
        textColor = "#D00000";
    }

    return (
        <View style={{backgroundColor:"#00284D"}}>
            <TouchableOpacity 
            style={[styles.button, {backgroundColor: buttonColor}]}
            onPress={() => navigation.navigate("StockInfo", {data: {symbol: props.ticker,  description: props.description}}) }
            >
                <View style={styles.textFormat}>
                    <View>
                        <Text style={[styles.tickerText, {color: textColor}]}>{props.ticker}</Text>
                        {/* <Text style={[styles.nameText, {color: textColor}]}>{props.description}</Text>  */}
                    </View>
                    <View>
                        <Text style={{ color: '#00284D', fontSize: 20, fontWeight:"400" }}>Shares: {props.shares}</Text>
                        <Text style={{ color: '#00284D', marginTop: 5, fontSize:20,fontWeight:"600" }}>Bought Price: ${props.price.toFixed(2)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View> 
        ///////
        // <View style={styles.card}>
        //     <Text style={{ color: '#00284D', fontSize: 40, paddingLeft: 20 }}>{props.ticker}</Text>
        //     <View>
        //         <Text style={{ color: '#00284D', fontSize: 20 }}>Shares: {props.shares}</Text>
        //         <Text style={{ color: '#00284D', marginTop: 5, fontSize: 20 }}>Total: ${props.price}</Text>
        //     </View>
        // </View>
        
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 20,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#FDF1D2",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },

    //////
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
        color:"black"
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