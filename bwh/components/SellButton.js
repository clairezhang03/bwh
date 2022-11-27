import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuthState } from '../core/authstate';
import { db } from '../core/config';
import { doc, updateDoc, arrayUnion, onSnapshot, setValue, arrayRemove } from "firebase/firestore";


export default function SellButton(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [userDoc, setUserDoc] = useState(null);
    const uid = useAuthState();
    const [balance, setBalance] = useState(null);
    const [userInvestedStocks, setUserInvestedStocks] = useState(null);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
            setUserDoc(doc.data());
            setBalance(doc.data().balance);
            setUserInvestedStocks(doc.data().investedStocks);
        });
        return unsub;
    }, [])

    const addToWatchList = (stockObject) => {
        updateDoc(doc(db, "users", uid), {
            watchlist: arrayUnion(stockObject),
        }).then(() => {
        }).catch((e) => console.log(e));
    }

    return (
        <View>
            <Modal
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                    <View style={{ backgroundColor: "#ffffff", margin: 40, padding: 20, borderRadius: 20, height: 300, alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}

                        >
                            <Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
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
        //flex: 2,
        //width: ""

    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        marginRight: 20,
    },
})