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
    const [sharesInvested, setSharesInvested] = useState(0);
    const [totalSellPrice, setSellPrice] = useState(0);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
            setUserDoc(doc.data());
            setBalance(doc.data().balance);
            setUserInvestedStocks(doc.data().investedStocks);
        });
        return unsub;
    }, [])

    const removeInvestedStocks = () => {
        for (let i = 0; i < userInvestedStocks.length; i++) {
            if (userInvestedStocks[i].tickerSymbol === props.tickerSymbol) {
                updateDoc(doc(db, "users", uid), {
                    investedStocks: arrayRemove(userInvestedStocks[i]),
                }).then(() => {
                }).catch((e) => console.log(e));
            }
        }
    };

    const updateBalance = () => {
        let newBalance = totalSellPrice + balance;
        updateDoc(doc(db, "users", uid), {
            balance: parseFloat(newBalance),
        }).then(() => {
        }).catch((e) => console.log(e));
    };

    const sellPressed = () => {
        setModalVisible(true);
        //console.log(userInvestedStocks);
        if (userInvestedStocks !== null) {
            console.log("not null");
            let totalShares = 0;
            for (let i = 0; i < userInvestedStocks.length; i++) {
                if (userInvestedStocks[i].tickerSymbol === props.tickerSymbol) {
                    totalShares = totalShares + userInvestedStocks[i].shares;
                }
            }
            setSharesInvested(totalShares);
            let price = totalShares * props.currentPrice;
            setSellPrice(price);
           // console.log(sharesInvested);
        }
    };

    const secondSellPressed = () => {
        removeInvestedStocks();
        updateBalance();
        setModalVisible(false);
    };

    return (
        <View>
            <Modal
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                    <View style={{ backgroundColor: "#ffffff", margin: 40, padding: 20, borderRadius: 20, height: 300, alignItems: "center" }}>
                        <Text style={styles.text}>Shares Owned: {sharesInvested}</Text>
                        <Text style={styles.text}>Total selling price: ${totalSellPrice}</Text>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity
                                onPress={() => secondSellPressed()}
                                style={styles.sellButton}
                            >
                                <Text style={styles.buttonText}>Sell</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.cancelButton}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={styles.button}
                onPress={() => sellPressed()}
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
        marginRight: 60,
        backgroundColor: "red",
        alignItems: "center",

    },
    textStyle: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        alignText: "center",
        marginHorizontal: 20,
    },
    sellButton: {
        backgroundColor: "red",
        borderRadius: 10,
        alignItems: "center",
        padding: 10,
        flex: 2,
        margin: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: "red",
        borderRadius: 10,
        alignItems: "center",
        padding: 10,
        flex: 2,
        margin: 10,
    },
    sellButton: {
        backgroundColor: "#06A77D",
        borderRadius: 10,
        alignItems: "center",
        padding: 10,
        flex: 2,
        margin: 10,
    },
    buttonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },

})