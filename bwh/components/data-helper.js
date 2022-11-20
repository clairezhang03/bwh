import useSWR from "swr"

export const convertDateToUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000);
  };
  
  export const convertUnixTimestampToDate = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000;
    return new Date(milliseconds).toLocaleDateString();
  };
  
  export const createDate = (date, days, weeks, months, years) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days + 7 * weeks);
    newDate.setMonth(newDate.getMonth() + months);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
  };

  export const fetchHistoricalData = (symbol, resolution, from, to) => {
    const fetcher = (url) => fetch(url).then((r) => r.json())
    return useSWR(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=cdp0asaad3i3u5gonhhgcdp0asaad3i3u5gonhi0`, fetcher, { refreshInterval: 10000 });
  };