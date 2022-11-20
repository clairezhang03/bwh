import React, {useState, useContext, useEffect} from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { mockHistoricalData } from '../constants/mock'
import useSWR from "swr"
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';
import { convertUnixTimestampToDate } from './data-helper';

export const {width: SIZE} = Dimensions.get('window');

export const formatUSD = value => {
    'worklet';
    if (value === '') {
      return '';
    }

    const formattedValue = `$${parseFloat(value).toFixed(2)}`
    return formattedValue;
  };

const Chart = ({stock}) => {
    const [data, setData] = useState(mockHistoricalData);
    
    const [chartReady, setChartReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setChartReady(true);
        }, 0)
    })

    //const stockData = useSWR(`https://finnhub.io/api/v1/quote?symbol=${data.symbol}&token=cdp0asaad3i3u5gonhhgcdp0asaad3i3u5gonhi0`, fetcher, { refreshInterval: 1000 });

    const formatData = () => {
        return data.c.map((item,index) => {
            return {
                x: data.t[index],
                y: parseFloat(item.toFixed(2)),
            };
        });
    };

    
    //const points = formatData(data);

    //console.log(points);

    
    const points = [
        {x: 1453075200, y: 1.47}, {x: 1453161600, y: 1.37},
        {x: 1453248000, y: 1.53}, {x: 1453334400, y: 1.54},
        {x: 1453420800, y: 1.52}, {x: 1453507200, y: 2.03},
        {x: 1453593600, y: 2.10}, {x: 1453680000, y: 2.50},
        {x: 1453766400, y: 2.30}, {x: 1453852800, y: 2.42},
        {x: 1453939200, y: 2.55}, {x: 1454025600, y: 2.41},
        {x: 1454112000, y: 2.43}, {x: 1454198400, y: 2.20},
      ];
    

    return (
        <View>
            <View style={styles.chartLineWrapper}>
                <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
                    <ChartYLabel 
                        format={formatUSD}
                        style={styles.priceText}
                    />
                    <View>
                        <ChartPath height={SIZE / 2} stroke="white" width={SIZE} />
                        <ChartDot style={{ backgroundColor: 'white' }} />
                    </View>
                </ChartPathProvider>
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
})