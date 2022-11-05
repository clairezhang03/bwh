import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
            <View style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.wrapper} >
                        <Text style={styles.logoText}>bwh.</Text>
                        <TextInput
                            placeholder='username'
                            onChangeText={text => setUsername(text)}
                            style={[styles.input, { marginBottom: 10 }]} 
                        />
                        <TextInput
                            placeholder='password'
                            onChangeText={text => setPassword(text)}
                            style={styles.input} 
                            secureTextEntry
                        />

                        <TouchableOpacity onPress={() => { navigation.replace("Home") }} style={[styles.button, { marginTop: 30 }]}>
                            <Text style={styles.buttonText}>Log in</Text>
                        </TouchableOpacity>
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
        justifyContent: "center",
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

})