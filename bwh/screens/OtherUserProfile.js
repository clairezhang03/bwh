
import { SafeAreaView, StyleSheet, FlatList, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function OtherUserProfile() {
    const route = useRoute();
    const { data } = route.params;

    const investedStocks = data.investedStocks

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.background}>
            <SafeAreaView>
                <Text>{data.fname}</Text>
                <Text>{data.lname}</Text>
                <Text>{data.email}</Text>

                <FlatList
                    data={investedStocks}
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

})