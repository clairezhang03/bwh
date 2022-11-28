import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function LeaderboardCard(props) {

    let buttonColor = "#d0e4f7";
    let textColor = "#286094";

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
                        <Text style={[styles.balanceText]}>${props.balance.toFixed(2)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View> 
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 10,
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        height:51
    },

    textFormat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",

    },
    nameText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    balanceText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
    },
})