import { SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Card from "../components/Card"
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { getDocs, collection } from "firebase/firestore";
import { db } from '../core/config'
import LeaderboardCard from "../components/LeaderboardCard"

// import {
//     useFonts,
//     WorkSans_400Regular,
//   } from '@expo-google-fonts\dev'

export default function LeaderBoard() {
    let sortedUsers = [];
    const [firstInfo, setFirstInfo] = useState({
        fname: "First",
        lname: "Investor",
        balance: 10000,
        email: "firstInvestor@gmail.com",
        investedStocks: []
    })

    const [secondInfo, setSecondInfo] = useState({
        fname: "Second",
        lname: "Investor",
        balance: 10000,
        email: "secondInvestor@gmail.com",
        investedStocks: []
    })

    const [thirdInfo, setThirdInfo] = useState({
        fname: "Third",
        lname: "Investor",
        balance: 10000,
        email: "thirdInvestor@gmail.com",
        investedStocks: []
    })

    const [fourthInfo, setFourthInfo] = useState({
        fname: "Fourth",
        lname: "Investor",
        balance: 10000,
        email: "fourthInvestor@gmail.com",
        investedStocks: []
    })

    const [fifthInfo, setFifthInfo] = useState({
        fname: "Fifth",
        lname: "Investor",
        balance: 10000,
        email: "fifthInvestor@gmail.com",
        investedStocks: []
    })


    useEffect(() => {
        getDocs(collection(db, "users")).then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                const nameBalance = {
                    fname: doc.data().fname,
                    lname: doc.data().lname,
                    balance: doc.data().balance,
                    investedStocks: doc.data().investedStocks,
                }
                sortedUsers.push(nameBalance);
            });
            sortedUsers.sort(function (a, b) { return b.balance - a.balance });

            if (sortedUsers.length > 0) {
                setFirstInfo(sortedUsers[0]);
            }

            if (sortedUsers.length > 1) {
                setSecondInfo(sortedUsers[1]);
            }

            if (sortedUsers.length > 2) {
                setThirdInfo(sortedUsers[2]);
            }

            if (sortedUsers.length > 3) {
                setFourthInfo(sortedUsers[3]);
            }

            if (sortedUsers.length > 4) {
                setFifthInfo(sortedUsers[4]);
            }

        }).catch((e) => alert(e))

    }, [])

    const routes = useRoute();
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity
        style={[styles.button, {backgroundColor: "#d0e4f7"}]}
            onPress={() => navigation.navigate("OtherUserProfile", { data: item })}>
            <LeaderboardCard name={item.fname + " " + item.lname} balance={item.balance} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.background}>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.topFormat}>
                    <Text style={styles.logoText}>b
                        <Text style={{ fontStyle: "italic" }}>w</Text>
                        h leaderboard</Text>

                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", paddingHorizontal: 40 }}>
                    <Text style={styles.statementText}>
                        Increase your account value for a spot on the leaderboard!
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Text style={styles.podiumUsers3}>{thirdInfo.fname}</Text>
                    <Text style={styles.podiumUsers1}>{firstInfo.fname}</Text>
                    <Text style={styles.podiumUsers2}>{secondInfo.fname}</Text>
                </View>

                <View style={styles.podium}>
                    <View style={styles.rectangle3}>
                        <View style={styles.circleHolder3}>
                            <View style={styles.circle3}>
                                <Image style={styles.medals} source={require('./assets/thirdplace.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.rectangle1}>
                        <View style={styles.circleHolder1}>
                            <View style={styles.circle1}>
                                <Image style={styles.medals} source={require('./assets/firstplace.png')} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.rectangle2}>
                        <View style={styles.circleHolder2}>
                            <View style={styles.circle2}>
                                <Image style={styles.medals} source={require('./assets/secondplace.png')} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.investorBox}>
                    <Text style={styles.topInvestorsText}> Top 5 Investors</Text>
                </View>

                <View style={[styles.cards, { position: "absolute", top: 460}]}>
                    <FlatList 
                        data={[firstInfo, secondInfo, thirdInfo, fourthInfo, fifthInfo]}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#00284D",
        flex: 1,
    },

    topFormat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingTop: 10

    },

    logoText: {
        fontSize: 45,
        fontStyle: "normal",
        fontWeight: "bold",
        color: "#FDF1D2",
        marginBottom: 0,
    },

    statementText: {
        color: "#AFC6DC",
        fontWeight: "700",
        fontSize: 17,
        lineHeight: 18,
        textAlign: "center",
    },

    topInvestorsText: {
        fontSize: 30,
        fontWeight: "400",
        color: "#FFF0C9",
        // fontFamily: "WorkSans_400Regular"
    },

    investorBox: {
        position: "absolute",
        width: "100%",
        height: 60,
        top: 402,
        backgroundColor: "#0E3A63",
        alignItems: "center",
        justifyContent: "center",
    },

    cards: {
        backgroundColor: "white",
        top: 283,
        position: "absolute",
        width: "100%",
        marginBottom: 1000,
        flex: 1
    },

    podium: {
        flexDirection: "row",
        top: 160,
        position: "absolute"
        // justifyContent: "center",
    },

    podiumUsers3: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFAEAE",
        top: 140,
        right: -15,
        flex: "wrap",
        width: 100,
        textAlign: "center"
    },
    podiumUsers2: {
        fontSize: 20,
        fontWeight: "700",
        color: "#BDFBB3",
        top: 100,
        flex: "wrap",
        width: 100,
        left: -10,
        textAlign: "center"

    },
    podiumUsers1: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFECBC",
        top: 40,
        flex: "wrap",
        width: 100,
        textAlign: "center"

    },

    rectangle3: {
        backgroundColor: "#FF7777",
        height: 79,
        width: 108,
        left: 33,
        top: 165,
    },

    rectangle2: {
        backgroundColor: "#BDFBB3",
        height: 122,
        width: 108,
        left: 33,
        top: 122,
    },

    rectangle1: {
        backgroundColor: "#FFECBC",
        height: 179,
        width: 108,
        left: 33,
        top: 65,
    },

    circleHolder3: {
        width: 105,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle3: {
        backgroundColor: 'white',
        borderColor: "white",
        width: 65,
        height: 65,
        borderRadius: 75,
        borderWidth: 2
    },

    circleHolder2: {
        width: 105,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle2: {
        backgroundColor: 'white',
        borderColor: "white",
        width: 65,
        height: 65,
        borderRadius: 75,
        borderWidth: 2
    },

    circleHolder1: {
        width: 105,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle1: {
        backgroundColor: 'white',
        borderColor: "white",
        width: 65,
        height: 65,
        borderRadius: 75,
        borderWidth: 2
    },
    medals: {
        left: 4,
        top: 4
    },

        button: {
        borderRadius: 10,
        padding: 10,
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        height:51
    },

})

