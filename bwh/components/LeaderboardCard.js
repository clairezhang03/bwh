import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function LeaderboardCard(props) {
    let textColor = "#286094";

    return (
        <View>
            <View style={styles.textFormat}>
                <View>
                    <Text style={[styles.nameText, { color: textColor }]}>{props.name}</Text>
                </View>
                <View>
                    <Text style={[styles.balanceText]}>${props.balance.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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