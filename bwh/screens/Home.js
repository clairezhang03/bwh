
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from "../components/Header"
import Card from "../components/Card"
import { useNavigation } from '@react-navigation/native'
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../core/config';
import { doc, onSnapshot } from "firebase/firestore";
import AppLoading from 'expo-app-loading';
import { useAuthState } from '../core/authstate'

export default function Home() {
    const navigation = useNavigation();
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [userDoc, setUserDoc] = useState(null);
    const uid = useAuthState()

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
            setUserDoc(doc.data());
        });
        return unsub;
    }, [])

    //prevents page from showing undefined in greeting
    if (userDoc == null) return <AppLoading />;

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

    let watchlist = userDoc?.watchlist;

    const renderItem = ({ item }) => (
        <Card symbol={item.tickerSymbol} description={item.description} />
    );

    return (

        <View style={styles.background}>
            <View style={styles.top}>
                <View style={[styles.topLogout]}>
                    <TouchableOpacity onPress={() => { handleSignOut() }}>
                        <Image style={styles.logoutIcon} source={require('./assets/logoutIcon.png')} />
                    </TouchableOpacity>
                </View>

                <View style={styles.topLogo}>
                    <Text style={styles.logoText}>b
                        <Text style={{ fontStyle: "italic" }}>w</Text>
                        h.</Text>
                </View>


            </View>

            <SafeAreaView>

                {/* <View style={{flexDirection: "row", justifyContent: "center", marginBottom: 10}}>
                    <Image style={styles.heart} source={require('./assets/heart.png')} />
                    <Text style={styles.watchlistText}>Watchlist</Text>
                </View> */}

                <Header name={userDoc?.fname} value={100000} percent={100} />

                <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
                    <Image style={styles.heart} source={require('./assets/heart.png')} />
                    <Text style={styles.watchlistText}>Watchlist</Text>
                </View>
                <FlatList
                    data={watchlist}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                />
            </SafeAreaView>
        </View >
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

    logoutIcon: {
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

    top: {
        //flexDirection: "row",
        marginTop: 50,
    },

    topLogo: {
        alignSelf: "center",
    },

    topLogout: {
        alignSelf: "flex-end",
        paddingEnd: 20,
    },

    watchlistText: {
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