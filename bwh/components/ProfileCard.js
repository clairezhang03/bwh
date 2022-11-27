

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ProfileCard(props) {

    return (
        <View style={styles.card}>
            <Text style={{ color: '#00284D', fontSize: 40, paddingLeft: 20 }}>{props.ticker}</Text>
            <View>
                <Text style={{ color: '#00284D', fontSize: 20 }}>Shares: {props.shares}</Text>
                <Text style={{ color: '#00284D', marginTop: 5, fontSize: 20 }}>${props.price}</Text>
            </View>
        </View>
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
    }
})