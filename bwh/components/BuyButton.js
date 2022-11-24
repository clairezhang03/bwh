import { StyleSheet, Text, TouchableOpacity, View, Modal, SafeAreaView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuthState } from '../core/authstate';
import { db } from '../core/config';
import { doc, updateDoc, arrayUnion, onSnapshot, setValue, arrayRemove } from "firebase/firestore";

export default function BuyButton(props) {
    const uid = useAuthState();
    const [modalVisible, setModalVisible] = useState(false);
    const [shares, setShares] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [userDoc, setUserDoc] = useState(null);
    const [balance, setBalance] = useState(null);
    
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
            setUserDoc(doc.data());
            setBalance(doc.data().balance);
        });
        return unsub;
    }, [])

    const calculateTotal = (shares) => {
        if (shares !== null && (props.currentPrice > 0)) {
            return (shares * props.currentPrice);
        } else {
            return 0;
        }
    };

    const updateBalance = (newBalance) => {
        let stockObject = {
            tickerSymbol: props.tickerSymbol,
            price: props.currentPrice,
            shares: shares,
        };
        updateDoc(doc(db, "users", uid), {
            balance: parseFloat(newBalance),
            investedStocks: arrayUnion(stockObject),
        }).then(() => {
        }).catch((e) => console.log(e));
    };

    const checkBalance = (totalAmount) => {
        if (balance > totalAmount) {
            setBalance(balance - totalAmount);
            updateBalance(balance);
        }
    };

    const buyPressed = (shares, price) => {
        setTotalAmount(shares * price);
        checkBalance(totalAmount);
        setModalVisible(false);
        setShares(0);
        setTotalAmount(0);
    };

    return (
        <View>
            <Modal
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                    <View style={{ backgroundColor: "#ffffff", margin: 40, padding: 20, borderRadius: 20, height: 300, }}>
                        <TextInput
                            style={styles.valueInput}
                            placeholder="Number of Shares"
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                setShares(parseFloat(text))
                                //console.log(totalAmount);

                                // if (timer !== null) {
                                //     clearTimeout(timer);
                                // }
                                // timer = setTimeout(function () {
                                //     setTotalAmount(shares * props.currentPrice);
                                //     console.log(totalAmount);
                                // }, 30);
                            }}
                        />
                        <Text>${shares !== null ? calculateTotal(shares).toFixed(2) : "0.00"}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => buyPressed(shares, props.currentPrice)}>
                            <Text>Buy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Buy</Text>
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
        backgroundColor: "#06A77D",
        alignItems: "center",

    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        marginRight: 20,
    },
    valueInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    totalAmount: {

    }
})