import { SafeAreaView, StyleSheet, FlatList, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import ProfileCard from "../components/ProfileCard"

export default function OtherUserProfile() {
    const route = useRoute();
    const { data } = route.params;

    const investedStocks = data.investedStocks;

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <ProfileCard ticker={item.tickerSymbol} price={item.price} shares={item.shares} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.background}>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.headingContainer}>
                    <View>
                        <Text style={styles.headingText}>{data.fname + " " + data.lname}</Text>
                        <Text style={styles.emailText}>{data.email}</Text>
                    </View>
                    <View style={styles.balanceWrapper}>
                        <Text style={styles.balanceText}>${data.balance}</Text>
                    </View>
                    <Text style={styles.headingText}>{data.fname}'s Invested Stocks:</Text>

                    <FlatList
                        //style={styles.flatlistWrapper}
                        data={investedStocks}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </SafeAreaView>
        </View >
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#00284D",
        flex: 1
    },
    headingText: {
        fontSize: 30,
        color: "white",
    },
    headingContainer: {
        //backgroundColor: "#0E487D",
        //borderRadius: 200,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        display: "flex",
        //flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        flex: 1
    },
    emailText: {
        padding: 5,
        color: "white",
    },
    balanceWrapper: {
        backgroundColor: "#0E487D",
        alignContent: "center",
        alignItems: "center",
        margin: 20,
        padding: 20,
        borderRadius: 10,
    },
    balanceText: {
        color: "white",
        fontSize: 40,
        fontWeight: "bold",
    },
  
    flatlistWrapper: {
        backgroundColor: "white",
        borderRadius: 10,
    },

})