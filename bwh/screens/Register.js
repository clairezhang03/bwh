import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

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

                            <TouchableOpacity onPress={() => { navigation.replace("Home") }} style={[styles.registerButton, { marginTop: 30 }]}>
                                <Text style={styles.registerButtonText}>register</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.register}>
                            <TouchableOpacity onPress={() => { navigation.replace("Login") }}>
                                <Text style={[styles.registerText, { textDecorationLine: "underline" }]}>back to login</Text>
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
        backgroundColor: "#00284D",
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
        color: "#FFECBC",
        marginBottom: 20,
        paddingTop: 20,
    },

    input: {
        backgroundColor: "white",
        marginBottom: 10,
        padding: 18,
        borderRadius: 18,
        borderWidth: 1,
    },

    registerButton: {
        padding: 20,
        backgroundColor: "#FFECBC",
        borderRadius: 18,
    },

    registerButtonText: {
        color: "#00284D",
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