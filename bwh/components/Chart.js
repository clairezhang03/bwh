import React, {useState, useContext, useEffect} from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
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
    //const fetcher = (url) => fetch(url).then((r) => r.json())
    //const result = useSWR(`https://finnhub.io/api/v1/stock/candle?symbol=IBM&resolution=D&from=1572651390&to=1575243390&token=cdp0asaad3i3u5gonhhgcdp0asaad3i3u5gonhi0`, fetcher, { refreshInterval: 1000 });
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

export default Chart

const styles = StyleSheet.create({
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