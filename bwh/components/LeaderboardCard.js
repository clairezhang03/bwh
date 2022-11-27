import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LeaderboardCard(props) {

    let textColor = "#06A77D";

    return (
        <View>
            <View style={styles.textFormat}>
                <View>
                    <Text style={[styles.nameText, { color: textColor }]}>{props.name}</Text>
                </View>
                <View>
                    <Text style={[styles.balanceText]}>${props.balance}</Text>
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
        fontSize: 30,
        fontWeight: "bold",
    },
    balanceText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
    },
})