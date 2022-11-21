import React, {useState, useContext, useEffect} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { mockHistoricalData } from '../constants/mock'
import useSWR from "swr"
import { 
    convertUnixTimestampToDate, 
    convertDateToUnixTimestamp,
    createDate,
} from './data-helper';
import { fetchHistoricalData } from './data-helper';
import { LineChart } from 'react-native-wagmi-charts';
import { chartConfig } from '../constants/config';

export const {width: SIZE} = Dimensions.get('window');

const Chart = ({stock}) => {
    const [data, setData] = useState(mockHistoricalData);
    const [filter, setFilter] = useState("1W");

    /*
    useEffect(() => {
        const getDateRange = () => {
            const { days, weeks, months, years } = chartConfig[filter]
            const endDate = new Date();
            const startDate = createDate(endDate, -days, -weeks, -months, -years);
    
            const startTimestampUnix = convertDateToUnixTimestamp(startDate);
            const endTimestampUnix = convertDateToUnixTimestamp(endDate);
    
            return { startTimestampUnix, endTimestampUnix };
        };

        const updateChartData = async () => {

            try {
                const { startTimestampUnix, endTimestampUnix } = getDateRange();
                const resolution = chartConfig[filter].resolution;
                const result = await fetchHistoricalData(stock, resolution, startTimestampUnix, endTimestampUnix);
                setData(formatData(result));
            }
            catch (error) {
                setData([]);
                console.log(error);
            }


        };


    }, [filter]);
    */

    const formatData = (stockData) => {
        return stockData.data?.c.map((item,index) => {
            return {
                timestamp: convertUnixTimestampToDate(stockData.data?.t[index]),
                value: parseFloat(item.toFixed(2)),
            };
        });
    };

    const getDateRange = () => {
        const { days, weeks, months, years } = chartConfig[filter]
        const endDate = new Date();
        const startDate = createDate(endDate, -days, -weeks, -months, -years);

        const startTimestampUnix = convertDateToUnixTimestamp(startDate);
        const endTimestampUnix = convertDateToUnixTimestamp(endDate);

        return { startTimestampUnix, endTimestampUnix };
    };

    const { startTimestampUnix, endTimestampUnix } = getDateRange();
    const resolution = chartConfig[filter].resolution;
    const result = fetchHistoricalData(stock, resolution, startTimestampUnix, endTimestampUnix);

    if (result.data?.c === undefined){
        return (
            <View style={styles.background}>
                <SafeAreaView>
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>loading data...</Text>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
    else {
        const points = formatData(result);

        return (
            <View>
                <View style={styles.chartLineWrapper}>
                    <LineChart.Provider data={points}>
                        <LineChart width={SIZE} height={SIZE/1.5}>
                            <LineChart.Path color='white'/>
                            <LineChart.CursorLine />
                        </LineChart>
                        <LineChart.PriceText style={styles.interactiveLabel}/>
                        <LineChart.DatetimeText style={styles.interactiveLabel}/>
                    </LineChart.Provider>
                </View>
    
            </View>
        )
    }
}

export default Chart

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#00284D",
        flex: 1,
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        height:"100%"
    },
    loadingText:{
        fontSize:40,
        color: "white",
        fontWeight: "bold",
    },
    priceText: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
        marginTop: 30,
        marginRight: 20,
    },
    chartLineWrapper: {
        marginTop: 10,
    },
    interactiveLabel: {
        marginLeft: 20,
        fontSize: 15,
        color: "white",
    },
})