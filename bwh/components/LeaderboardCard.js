import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function LeaderboardCard(props) {

    let buttonColor = "#F9FFEF";
    let textColor = "#06A77D";

    return (
        <View>
            <TouchableOpacity 
            style={[styles.button, {backgroundColor: buttonColor}]}
            >
                <View style={styles.textFormat}>
                    <View>
                        <Text style={[styles.nameText, {color: textColor}]}>{props.name}</Text>
                    </View>
                    <View>
                        <Text style={[styles.balanceText]}>${props.balance}</Text>
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
    nameText: {
        fontSize: 30,
        fontWeight: "bold",
    },
    balanceText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
    },
})