
import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../core/config'
import { doc, setDoc } from "firebase/firestore";
import { useUpdateAuthState } from '../core/authstate'

//DO DATE PICKER
export default function Register() {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstNameBorder, setFirstNameBorder] = useState("#D8D8D8");
    const [lastNameBorder, setLastNameBorder] = useState("#D8D8D8");
    const [birthdayBorder, setBirthdayBorder] = useState("#D8D8D8");
    const [emailBorder, setEmailBorder] = useState("#D8D8D8");
    const [passwordBorder, setPasswordBorder] = useState("#D8D8D8");

    const updateAuth = useUpdateAuthState();

    //send user to home page if already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                updateAuth(user.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: "HomeScreen" }]
                });
            }
        })
        return unsubscribe;
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                //const numericBalance = parseFloat(balance);
                console.log(typeof balance);
                const data = {
                    fname: firstName,
                    lname: lastName,
                    bday: birthday,
                    email: email,
                    password: password,
                    balance: 10000,
                    investedStocks: [],
                    watchlist: [],
                }
                console.log(data);
                setDoc(doc(db, "users", user.uid), data)
                    .then(() => {
                        
                    })
                    .catch((error) => alert(error.message));
            })
            .catch((error) => alert(error.message));
    }

    return (

        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <View style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.wrapper} >
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>b
                                <Text style={{ fontStyle: "italic" }}>w</Text>
                                h.</Text>
                        </View>

                        <View style={styles.middle}>

                            <TextInput
                                placeholder='First Name'
                                onChangeText={text => setFirstName(text)}
                                onFocus={() => { setFirstNameBorder("#00284D") }}
                                onBlur={() => { setFirstNameBorder("#D8D8D8") }}
                                style={[styles.input, { borderColor: firstNameBorder }]}
                            />

                            <TextInput
                                placeholder='Last Name'
                                onChangeText={text => setLastName(text)}
                                onFocus={() => { setLastNameBorder("#00284D") }}
                                onBlur={() => { setLastNameBorder("#D8D8D8") }}
                                style={[styles.input, { borderColor: lastNameBorder }]}
                            />

                            <TextInput
                                placeholder='birthday (MM/DD/YYYY)'
                                onChangeText={text => setBirthday(text)}
                                onFocus={() => { setBirthdayBorder("#00284D") }}
                                onBlur={() => { setBirthdayBorder("#D8D8D8") }}
                                style={[styles.input, { borderColor: birthdayBorder }]}
                            />

                            <TextInput
                                placeholder='Starting Account Balance in $'
                                keyboardType = 'numeric'
                                onChangeText={text => setBalance(Number(text))}
                                onFocus={() => { setBalanceBorder("#00284D") }}
                                onBlur={() => { setBalanceBorder("#D8D8D8") }}
                                style={[styles.input, { borderColor: balanceBorder }]}
                            />


                            <TextInput
                                placeholder='email'
                                onChangeText={text => setEmail(text)}
                                onFocus={() => { setEmailBorder("#00284D") }}
                                onBlur={() => { setEmailBorder("#D8D8D8") }}
                                style={[styles.input, { borderColor: emailBorder }]}
                            />

                            <TextInput
                                placeholder='password'
                                onChangeText={text => setPassword(text)}
                                onFocus={() => { setPasswordBorder("#00284D") }}
                                onBlur={() => { setPasswordBorder("#D8D8D8") }}
                                style={[styles.input, { borderColor: passwordBorder }]}
                                secureTextEntry
                            />

                            <TouchableOpacity onPress={() => { handleSignUp() }} style={[styles.registerButton, { marginTop: 30 }]}>
                                <Text style={styles.registerButtonText}>register.</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.register}>
                            <TouchableOpacity onPress={() => { navigation.replace("Login") }}>
                                <Text style={[styles.registerText, { textDecorationLine: "underline" }]}>back to login.</Text>
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
        backgroundColor: "#286094",
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        padding: 20,
    },


    logoText: {

        color: "#FFECBC",
        marginBottom: 20,
        fontSize: 65,
        fontStyle: "normal",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: -10,
        paddingTop: 30,
    },

    input: {
        backgroundColor: "white",
        margin: 10,
        padding: 18,
        borderRadius: 18,
        textDecorationLine: 'underline',
        color: "#286094",
        fontSize: 18,
        fontWeight: "500",
    },

    registerButton: {
        padding: 0,
        backgroundColor: "#FFECBC",


        alignSelf: "center",
        justifyContent: "center",
        width: 104,
        height: 35,
        borderRadius: 30,
    },

    registerButtonText: {
        textAlign: "center",
        color: "#286094",
        fontSize: 18,
        fontWeight: "500",
    },

    registerText: {
        color: "#FFECBC",
        fontWeight: "600",

    },

    register: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
    },

})