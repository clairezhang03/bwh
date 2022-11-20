import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Card from "../components/Card"
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

// import {
//     useFonts,
//     WorkSans_400Regular,
//   } from '@expo-google-fonts\dev'

export default function LeaderBoard() {
    const routes = useRoute();
    const navigation = useNavigation();


    var first = "myBestWasTried";
    var second = "imSoTired";
    var third = "BLARGHHH!!!";


    return (
        <View style={styles.background}>
            <SafeAreaView>
                <View style={styles.topFormat}>
                        <Text style={styles.logoText}>b
                        <Text style={{fontStyle: "italic"}}>w</Text>
                          h leaderboard</Text>

                </View>

                <View style={{flexDirection: "row",justifyContent:"center", paddingHorizontal:40}}>
                    <Text style={styles.statementText}>
                        Increase your account value for a spot on the leaderboard!
                    </Text> 
                </View>
                <View style = {{flexDirection:"row", justifyContent:"space-evenly"}}>
                    <Text style = {styles.podiumUsers3}>{third}</Text>
                    <Text style = {styles.podiumUsers1}>{first}</Text>
                    <Text style = {styles.podiumUsers2}>{second}</Text>
                </View>

                <View style = {styles.podium}>
                    <View style={styles.rectangle3}> 
                        <View style={styles.circleHolder3}>
                            <View style={styles.circle3} />
                        </View>
                    </View>
                    <View style={styles.rectangle1}> 
                        <View style={styles.circleHolder1}>
                            <View style={styles.circle1} />
                        </View>
                    </View>
                    <View style={styles.rectangle2}> 
                        <View style={styles.circleHolder2}>
                            <View style={styles.circle2} />
                        </View>
                    </View>
                </View>

                <View style = {styles.investorBox}>
                    <Text style = {styles.topInvestorsText}> Top 5 Investors</Text>
                </View>

                <View style = {{position:"absolute", top:180}}>
                <ScrollView style={styles.cards}>
                    <Card tickerSymbol="SPOT" name="Spotify" percentChange={-12} stockPrice={63} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    
                </ScrollView>
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
        paddingHorizontal:30,
        paddingTop:10
        
    },

    logoText: {
        fontSize: 45,
        fontStyle: "normal",
        fontWeight: "bold",
        color: "#FDF1D2",
        marginBottom: 0,
    },

    statementText:{
        color:"#AFC6DC",
        fontWeight: "700",
        fontSize: 17,
        lineHeight: 18,
        textAlign: "center",
    },

    topInvestorsText:{
        fontSize: 30,
        fontWeight: "400",
        color: "#FFF0C9",
        // fontFamily: "WorkSans_400Regular"
    },

    investorBox: {
        position: "absolute",
        width: 390,
        height: 60,
        top: 402,
        backgroundColor: "#0E3A63",
        alignItems: "center",
        justifyContent: "center",
    },

    cards:{
        backgroundColor: "white",
        top:283,
        position: "absolute",
        width: 390
        
    },

    podium:{
        flexDirection: "row",
        top:160,
        position: "absolute"
        // justifyContent: "center",
    },

    podiumUsers3:{
        fontSize: 20,
        fontWeight: "700",
        color: "#FFAEAE",
        top:140,
        right: -15,
        flex: "wrap",
        width: 100,
        textAlign: "center"
    },
    podiumUsers2:{
        fontSize: 20,
        fontWeight: "700",
        color: "#BDFBB3",
        top:100,
        flex: "wrap",
        width: 100,
        left:-10,
        textAlign: "center"

    },
    podiumUsers1:{
        fontSize: 20,
        fontWeight: "700",
        color: "#FFECBC",
        top:40,
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

})

