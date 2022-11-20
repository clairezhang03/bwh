import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from "../components/Header"
import Card from "../components/Card"
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'

// import {
//     useFonts,
//     WorkSans_400Regular,
//   } from '@expo-google-fonts\dev'

export default function UserProfile() {
    const routes = useRoute();
    const navigation = useNavigation();


    var userPercent = 12.5;
    var userValue = 100000;
    var username = "BWH";


    return (
        <View style={styles.background}>
            <SafeAreaView>
                <View style={styles.topFormat}>
                    <TouchableOpacity onPress={() => {navigation.replace("HomeScreen")}}>
                        <Text style={styles.logoText}>b
                        <Text style={{fontStyle: "italic"}}>w</Text>
                          h.</Text>
                    </TouchableOpacity>

                        <Text style={styles.accountValueText}>${userValue}</Text> 
                        {/* replace with user data */}
                </View>
                <View style={styles.percentFormat}>
                    {/* replace with user data */}
                    <Text style={[styles.percentText, userPercent > 0 ? styles.percentInc : styles.percentDec]}>{userPercent}%</Text>
                </View>

                <View style={{flexDirection: "row",justifyContent:"center"}}>
                    <Text style={{fontSize:30, color: "white", }}>insert graph here</Text> 
                    {/* replace with graph here */}
                </View>

                <View style = {styles.usernameBackground}>
                    <Text style = {styles.usernameText}> {username}'s Investments</Text>
                </View>

                <View>
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal:30,
        paddingTop:30
        
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

    percentFormat:{
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal:30,
    },

    percentText: {
        display: "flex",
        fontSize: 25,
        fontWeight: "bold",
        justifyContent: "flex-start",
        borderColor: "white"
    },

    percentInc:{
        color: "#06A77D",
    },

    percentDec:{
        color: "#D00000", 
    },

    usernameText:{
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
        top: 362,
        backgroundColor: "#0E3A63",
        alignItems: "center",
        justifyContent: "center",
    },

    cards:{
        backgroundColor: "white",
        top:235,
        
    }
})