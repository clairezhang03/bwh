import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from "../components/Header"
import Card from "../components/Card"
import { useNavigation } from '@react-navigation/native'
import { signOut } from "firebase/auth";
import { auth } from '../core/config';

export default function Home() {
    const navigation = useNavigation();
   
    signOutUser = async () => {
        try {
            await signOut(auth);
        }
        catch (error) {
            alert(error);
        }
    }

    const handleSignOut = () => {
        signOutUser();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    }

    return (
        <View style={styles.background}>
            <SafeAreaView>
                <TouchableOpacity style={styles.signOutButton} onPress={() => { handleSignOut() }} >
                    <Text style={styles.signOutButtonText}>Sign Out</Text>
                </TouchableOpacity>

                <Header name="BWH" value={100000} percent={100} />
                <Text style={styles.favText}>Wishlist</Text>
                <ScrollView>
                    <Card tickerSymbol="SPOT" name="Spotify" percentChange={-12} stockPrice={63} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                    <Card tickerSymbol="AAPL" name="Apple" percentChange={100} stockPrice={100} />
                </ScrollView>
            </SafeAreaView>
        </View >
    )
}

const styles = StyleSheet.create({
    headerText: {
        color: "red"
    },
    background: {
        backgroundColor: "#00284D",
    },
    favText: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
    },

    signOutButton: {
        padding: 20,
        backgroundColor: "#FFECBC",
        borderRadius: 18,
    },

    signOutButtonText: {
        color: "#00284D",
        textAlign: "center",
        fontSize: 18,
    },
})