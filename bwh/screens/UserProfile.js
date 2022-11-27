import { SafeAreaView, StyleSheet, Text, FlatList, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from "../components/Header"
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { useAuthState } from '../core/authstate'
import { db } from '../core/config';
import { doc, onSnapshot } from "firebase/firestore";

// import {
//     useFonts,
//     WorkSans_400Regular,
//   } from '@expo-google-fonts\dev'

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    return `#${randomColor}`;
};

export default function UserProfile(props) {
    const routes = useRoute();
    const navigation = useNavigation();

    const [investedStocks, setInvestedStocks] = useState([]);
    const [balance, setBalance] = useState(0)
    const [percent, setPercent] = useState(0)
    const [name, setName] = useState("bwh")
    const uid = useAuthState()

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
            setInvestedStocks(doc.data().investedStocks);
            setBalance(doc.data().balance);
            setPercent(((doc.data().balance - 10000) / 10000) * 100);
            setName(doc.data().fname + " " + doc.data().lname);
        });
        return unsub;
    }, [])

    const Card = (props) => {
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


    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <Card ticker={item.tickerSymbol} price={item.price} shares={item.shares} />
        </TouchableOpacity>
    );

    return (
        <View style={{ backgroundColor: "#00284D" }}>
            <SafeAreaView>
                <View style={styles.background}>

                    <View style={styles.topFormat}>
                        <TouchableOpacity onPress={() => { navigation.replace("HomeScreen") }}>
                            <Text style={styles.logoText}>b
                                <Text style={{ fontStyle: "italic" }}>w</Text>
                                h.</Text>
                        </TouchableOpacity>

                        <Text style={styles.accountValueText}>${balance}</Text>
                    </View>

                    <View style={styles.percentFormat}>
                        <Text style={[styles.percentText, percent > 0 ? styles.percentInc : styles.percentDec]}>{percent}%</Text>
                    </View>

                    <View>
                        <View style={styles.circleHolder}>
                            <View style={styles.circle}>
                                <Text style={[styles.userInitial, { color: generateColor() }]}>{name[0]}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.usernameBackground}>
                        <Text style={styles.usernameText}> {name}'s Investments</Text>
                    </View>

                    <View style={styles.cards}>
                        <FlatList
                            //style={styles.flatlistWrapper}
                            data={investedStocks}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index}
                        />

                    </View>
                </View>


            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#00284D",
        // flex: 1,
        height: "100%",
    },

    topFormat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingTop: 10

    },

    logoText: {
        fontSize: 50,
        fontStyle: "normal",
        fontWeight: "bold",
        color: "#FDF1D2",
        marginBottom: 0,
    },

    accountValueText: {
        fontSize: 35,
        fontStyle: "normal",
        fontWeight: "bold",
        color: "#FFFFFF",
    },

    percentFormat: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 30,
    },

    percentText: {
        display: "flex",
        fontSize: 25,
        fontWeight: "bold",
        justifyContent: "flex-start",
        borderColor: "white"
    },

    percentInc: {
        color: "#06A77D",
    },

    percentDec: {
        color: "#D00000",
    },

    usernameText: {
        fontSize: 30,
        weight: 400,
        color: "#FFF0C9",
        // fontFamily: "WorkSans_400Regular"
    },

    usernameBackground: {
        position: "absolute",
        width: 390,
        height: 60,
        left: 0,
        top: 220,
        backgroundColor: "#0E3A63",
        alignItems: "center",
        justifyContent: "center",
    },

    userInitial: {
        fontSize: 100,
        color: "black",
        fontWeight: "700",


    },

    cards: {
        backgroundColor: "white",
        top: 70,

    },

    circleHolder: {

        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        backgroundColor: 'white',
        borderColor: "white",
        width: 120,
        height: 120,
        borderRadius: 75,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
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