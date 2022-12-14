import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'

let hours = new Date().getHours();

export default function Header(props) {

    let greeting = "Good Morning";
    if (hours >= 11 && hours <= 16) {
        greeting = "Good Afternoon";
    } else if (hours > 16 && hours < 21) {
        greeting = "Good Evening";
    } else if (hours >= 21 || hours < 4) {
        greeting = "Good Night";
    }

    var percentColor = "#D00000";
    if (props.percent > 0) {
        percentColor = "#06A77D";
    }

    return (
        <View style={styles.headerWrapper}>
            <View style={styles.greetingWrapper}>
                <Text style={styles.greetingText}>{greeting}, {"\n"+props.name}</Text>
                <View> 
                    <Text style={styles.valueText}>${props.value.toFixed(2)}</Text>
                    <Text style={[styles.percentText, {color: percentColor}]}>{(props.percent>0? "+":"") + props.percent.toFixed(2)}%</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    greetingText: {
        fontSize: 25,
        color: "#FFF9EB"
    },
    headerWrapper: {
        padding: 20
    },

    greetingWrapper: {
        backgroundColor: "#0E487D",
        borderRadius: 200,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },
    valueText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
    },
    percentText: {
        fontSize: 20,
        textAlign: "center",
        fontWeight:"600"
    }
})