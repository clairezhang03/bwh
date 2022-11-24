
import { SafeAreaView, StyleSheet, FlatList, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function OtherUserProfile() {
    const route = useRoute();
    const { data } = route.params;

    const investedStocks = data.investedStocks;

    const Card = (props) => {
        return (
            <View style={styles.card}>
                <Text style={{ color: '#00284D', fontSize: 40, paddingLeft: 20 }}>{props.ticker}</Text>
                <View>
                    <Text style={{ color: '#00284D', fontSize: 20 }}>Shares: {props.shares}</Text>
                    <Text style={{ color: '#00284D', marginTop: 5, fontSize: 20 }}>${props.price}</Text>
                </View>
            </View>
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <Card ticker={item.tickerSymbol} price={item.price} shares={item.shares} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.background}>
            <SafeAreaView>
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
    card: {
        borderRadius: 10,
        padding: 20,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#FDF1D2",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
    },
    flatlistWrapper: {
        backgroundColor: "white",
        borderRadius: 10,
    },

})