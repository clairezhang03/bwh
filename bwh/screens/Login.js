import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../core/config'
//import { doc, setDoc, Timestamp, addDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailBorder, setEmailBorder] = useState("#D8D8D8");
    const [passwordBorder, setPasswordBorder] = useState("#D8D8D8");

    //send user to home page if already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                });
            }
        })
        return unsubscribe;
    }, [])

    //if wrong email / passwd --> error, useEffect will send to home screen already
    const handleLogin = () => {
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
            })
            .catch((error) => alert(error.message));
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <View style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.wrapper} >
                        <View style={styles.top}>
                            <Text style={styles.logoText}>bwh.</Text>
                        </View>

                        <View style={styles.middle}>
                            <TextInput
                                placeholder='email'
                                onChangeText={text => setEmail(text)}
                                onFocus={() => { setEmailBorder("#00284D") }}
                                onBlur={() => { setEmailBorder("#D8D8D8") }}
                                style={[styles.input, { marginBottom: 10, borderColor: emailBorder }]}
                            />
                            <TextInput
                                placeholder='password'
                                onChangeText={text => setPassword(text)}
                                onFocus={() => { setPasswordBorder("#00284D") }}
                                onBlur={() => { setPasswordBorder("#D8D8D8") }}
                                style={[styles.input, { borderColor: passwordBorder }]}
                                secureTextEntry
                            />

                            <TouchableOpacity onPress={() => { handleLogin() }} style={[styles.button, { marginTop: 30 }]}>
                                <Text style={styles.buttonText}>Log in</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.register}>
                            <Text style={styles.registerText}>new here? </Text>
                            <TouchableOpacity onPress={() => { navigation.replace("Register") }}>
                                <Text style={[styles.registerText, { textDecorationLine: "underline" }]}>register</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#FDF1D2",
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        padding: 20,
    },

    logoText: {
        fontSize: 50,
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: "center",
        color: "#00284D",
        marginBottom: 20,
        paddingTop: 20,
    },

    input: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 18,
        borderWidth: 1,
    },

    button: {
        padding: 20,
        backgroundColor: "#00284D",
        borderRadius: 18,
    },

    buttonText: {
        color: "#FDF1D2",
        textAlign: "center",
        fontSize: 18,
    },

    registerText: {
        color: "#00284D",
    },

    register: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
    },
})