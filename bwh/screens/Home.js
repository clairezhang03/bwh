import { SafeAreaView, TouchableOpacity, StyleSheet, Text, Image, View, ScrollView } from 'react-native'
import React from 'react'
import Header from "../components/Header"
import Card from "../components/Card"
import { useNavigation } from '@react-navigation/native'

export default function Home() {
    const navigation = useNavigation();


    return (
        
        <View style={styles.background}>

                <View style={styles.top}>
                    <View style={[styles.topLogout]}>
                        <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                             <Image style={styles.logoutIcon} source={require('./assets/logoutIcon.png')}/>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.topLogo}>
                        <Text style={styles.logoText}>b
                        <Text style={{fontStyle: "italic"}}>w</Text>
                          h.</Text>
                    </View>


                </View>

            <SafeAreaView>

                <Header name="BWH" value={100000} percent={100} />

                <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 10}}>
                    <Image style={styles.heart} source={require('./assets/heart.png')} />
                    <Text style={styles.watchlistText}>Watchlist</Text>
                </View>
                
                <ScrollView>
                    <Card tickerSymbol="SPOT" name="Spotify" percentChange={-12} stockPrice={63} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    
                </ScrollView>
            </SafeAreaView>
        </View>

    )
}

const styles = StyleSheet.create({

    background: {
        backgroundColor: "#00284D",
    },

    heart: {
        height: 30,
        width: 35,
        alignSelf: 'center',
        marginRight: 10
    },

    logoutIcon:{
        width: 40,
        height: 40,
        alignSelf: "center",
    },

    logoText: {
        fontSize: 50,
        fontStyle: "normal",
        fontWeight: "bold",
        color: "#FDF1D2",
        marginBottom: 0,
    },

    top:{
      //flexDirection: "row",
       marginTop: 50,
    },

    topLogo:{
        alignSelf: "center",
    },

    topLogout:{
        alignSelf: "flex-end",
        paddingEnd: 20,
    }, 
    
    watchlistText: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
    },
})