import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Search from '../components/Search'

export default function SearchScreen() {
  return (
    <View style={styles.background}>
        <SafeAreaView>
            <Search/>
        </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#00284D",
        flex: 1,
    },
})