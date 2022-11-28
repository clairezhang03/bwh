import { SafeAreaView, StyleSheet, FlatList, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import ProfileCard from "../components/ProfileCard"

const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    return `#${randomColor}`;
};

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

        <View style={{ backgroundColor: "#00284D", flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
                <View style={[styles.background,{flex:1}]}>

                    <View style={styles.topFormat}>
                        <TouchableOpacity onPress={() => { navigation.replace("HomeScreen") }}>
                            <Text style={styles.logoText}>b
                                <Text style={{ fontStyle: "italic" }}>w</Text>
                                h.</Text>
                        </TouchableOpacity>

                         <Text style={styles.balanceText}>${data.balance}</Text>
                    </View>

                    <View style={styles.percentFormat}>
                        <Text style={[styles.percentText, data.percent > 0 ? styles.percentInc : styles.percentDec]}>{data.percent}%</Text>
                    </View>
                    

                    <View>
                        <View style={styles.circleHolder}>
                            <View style={styles.circle}>
                                <Text style={[styles.userInitial, { color: generateColor() }]}>{data.fname[0]}</Text>

                            </View>

                        </View>
                    </View>

                    <View style={styles.usernameBackground}>
                        <Text style={styles.usernameText}> {data.fname + " " + data.lname}'s Investments</Text>
                    </View>

                    <View style={[styles.cards,{flex:1}]}>
                        <FlatList
                            //style={styles.flatlistWrapper}
                            data={investedStocks}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index}
                            
                        />

                    </View>
                </View>


            </SafeAreaView>
        </View>
        ///////////////
        // <View style={styles.background}>
        //     <SafeAreaView style={{flex: 1}}>
                
        //         <View style={styles.headingContainer}>
        //             <View>
        //                 <View style={styles.topLogo}>
        //                 <Text style={styles.logoText}>b
        //                     <Text style={{ fontStyle: "italic" }}>w</Text>
        //                     h.</Text>
        //             </View>

        //                 <Text style={styles.headingText}>{data.fname + " " + data.lname}</Text>
        //                 <Text style={styles.emailText}>{data.email}</Text>
        //             </View>
        //             <View style={styles.balanceWrapper}>
        //                 <Text style={styles.balanceText}>${data.balance}</Text>
        //             </View>
        //             <Text style={styles.headingText}>{data.fname}'s Invested Stocks:</Text>

        //             <FlatList
        //                 //style={styles.flatlistWrapper}
        //                 data={investedStocks}
        //                 renderItem={renderItem}
        //                 keyExtractor={(item, index) => index}
        //             />
        //         </View>
        //     </SafeAreaView>
        // </View >
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#00284D",
        flex: 1
    },
    headingText: {
        fontSize: 35,
        color: "white",
        fontWeight: "700",
        textAlign: "center"
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
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 10,
    },
    balanceText: {
        color: "white",
        fontSize: 35,
        fontWeight: "bold",
    },
  
    flatlistWrapper: {
        backgroundColor: "white",
        borderRadius: 10,
    },
///////jessica's changes////
    logoText: {
        fontSize: 50,
        fontStyle: "normal",
        fontWeight: "bold",
        color: "#FDF1D2",
        marginBottom: 0,
    },

    // topLogo: {
    //     alignSelf: "center",
    // },

    // background: {
    //     backgroundColor: "#00284D",
    //     // flex: 1,
    //     height: "100%",
    // },

    topFormat: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        paddingTop: 10

    },

    logoText: {
        fontSize: 50,
        fontStyle: "normal",
        fontWeight: "bold",
        color: "#FDF1D2",
        marginBottom: 0,
    },

    accountValueText: {
        fontSize: 35,
        fontStyle: "normal",
        fontWeight: "bold",
        color: "#FFFFFF",
    },

    percentFormat: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 30,
    },

    percentText: {
        display: "flex",
        fontSize: 25,
        fontWeight: "bold",
        justifyContent: "flex-start",
        borderColor: "white"
    },

    percentInc: {
        color: "#06A77D",
    },

    percentDec: {
        color: "#D00000",
    },

    usernameText: {
        fontSize: 30,
        weight: 400,
        color: "#FFF0C9",
        // fontFamily: "WorkSans_400Regular"
    },

    usernameBackground: {
        position: "absolute",
        width: 390,
        height: 60,
        left: 0,
        top: 220,
        backgroundColor: "#0E3A63",
        alignItems: "center",
        justifyContent: "center",
    },

    userInitial: {
        fontSize: 100,
        color: "black",
        fontWeight: "700",


    },

    cards: {
        backgroundColor: "white",
        top: 70,
    },

    circleHolder: {

        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        backgroundColor: 'white',
        borderColor: "white",
        width: 120,
        height: 120,
        borderRadius: 75,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

})