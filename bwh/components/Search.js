import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { mockSearchResults } from './mock';
import { SearchResults } from './SearchResults';

export default function Search() {
    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState(mockSearchResults.result);
    const [searchBorder, setSearchBorder] = useState("#D8D8D8");

    const clear = () => {
        setInput("");
        setBestMatches([]);
    };

    const updateBestMatches = () => {
        setBestMatches(mockSearchResults.result);
    };

    return (
        <View style={styles.searchWrapper}>
            <TextInput
                placeholder='Search'
                onChangeText={text => setInput(text)}
                onFocus={() => { setSearchBorder("#00284D") }}
                onBlur={() => { setSearchBorder("#D8D8D8") }}
                style={[styles.input, { borderColor: searchBorder }]}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        updateBestMatches();
                    }
                }}
            />
            <TouchableOpacity onPress={() => updateBestMatches()}>
                <Text>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 18,
        borderWidth: 1,
        marginLeft: 10,
        width: "90%",
    },
    searchWrapper: {
        backgroundColor: "#00284D",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },

})