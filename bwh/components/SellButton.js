import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React from 'react'

export default function SellButton(props) {
    return (
        <View>
            <TouchableOpacity
                style={styles.button}
            //onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Sell</Text>
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
        backgroundColor: "red",
        alignItems: "center",

    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        marginRight: 20,
    },
})