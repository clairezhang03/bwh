import { StyleSheet, Text, TouchableOpacity, View, Modal, SafeAreaView, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuthState } from '../core/authstate';
import { db } from '../core/config';
import { doc, updateDoc, arrayUnion, onSnapshot, setValue, arrayRemove } from "firebase/firestore";

export default function BuyButton(props) {
    const uid = useAuthState();
    const [modalVisible, setModalVisible] = useState(false);
    const [shares, setShares] = useState(null);
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
        //console.log(shares);
        if (shares !== null && (props.currentPrice > 0)) {
            return parseFloat(shares * props.currentPrice);
        } else {
            return 0;
        }
    };

    const updateBalance = (newBalance) => {
        let stockObject = {
            tickerSymbol: props.tickerSymbol,
            price: props.currentPrice,
            shares: shares,
            description: props.description,
        };
        updateDoc(doc(db, "users", uid), {
            balance: parseFloat(newBalance),
            investedStocks: arrayUnion(stockObject),
        }).then(() => {
        }).catch((e) => console.log(e));
    };

    const checkBalance = (totalAmount) => {
        if (balance > totalAmount) {
            console.log(totalAmount);
            //setBalance(parseFloat(balance) - parseFloat(totalAmount));
            let endBalance = balance - totalAmount;
            console.log(endBalance);
            updateBalance(endBalance);
        } else {
            alert("Not enough money in account");
        }
    };

    const buyPressed = (shares) => {
        console.log("this is current share amount" + shares);
        console.log(calculateTotal(shares));
        let totalAmount = calculateTotal(shares);
        console.log("this is current total price" + totalAmount);
        checkBalance(totalAmount);
        setModalVisible(false);
        setShares(0);
    };

    return (
        <View>
            <Modal
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                    <View style={{ backgroundColor: "#ffffff", margin: 40, padding: 20, borderRadius: 20, height: 300, alignItems:"center" }}>
                        <TextInput
                            style={styles.valueInput}
                            placeholder="Number of Shares"
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                setShares(parseFloat(text))
                            }}
                        />
                        <Text style={styles.totalAmount}>Price: ${shares !== null ? calculateTotal(shares).toFixed(2) : "0.00"}</Text>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.cancelButton}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => buyPressed(shares)}
                                style={styles.buyButton}
                            >
                                <Text style={styles.buttonText}>Buy</Text>
                            </TouchableOpacity>
                        </View>

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
        marginLeft: 60,
        marginRight: 20,
        backgroundColor: "#06A77D",
        alignItems: "center",

    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        alignText: "center",
        marginHorizontal: 20,
    },
    valueInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    buyButton: {
        backgroundColor: "#06A77D",
        borderRadius: 10,
        alignItems: "center",
        padding: 10,
        flex: 2,
        margin: 10,
    },
    cancelButton: {
        backgroundColor: "red",
        borderRadius: 10,
        alignItems: "center",
        padding: 10,
        flex: 2,
        margin: 10,
    },
    totalAmount: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 20,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
    },
    buttonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        marginTop: 30,
    },
})