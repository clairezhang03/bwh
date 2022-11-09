import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Register() {
    const navigation = useNavigation();
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstNameBorder, setFirstNameBorder] = useState(false);
    const [lastNameBorder, setLastNameBorder] = useState(false);
    const [birthdayBorder, setBirthdayBorder] = useState(false);
    const [passwordBorder, setPasswordBorder] = useState(false);
    const [emailBorder, setEmailBorder] = useState(false);

    return (
        
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <View style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.wrapper} >
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>b
                                <Text style={{fontStyle: "italic"}}>w</Text>
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
        marginBottom: -100,
        paddingTop: 50,
    },

    input: {
        backgroundColor: "white",
        margin: 15,
        padding: 18,
        borderRadius: 18,
        padding: 18,
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
        height:35,
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