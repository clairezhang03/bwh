import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = (props) => {
  return (
    <View style={styles.card}>
      <Text style={{ color: 'white', fontSize: 18 }}>{props.symbol}</Text>
      <Text style={{ color: 'white', marginTop: 5 }}>{props.description}</Text>
    </View>
  );
};

export default function SearchStocks() {
  const [search, setSearch] = useState([]);
  const [searchCount, setSearchCount] = useState(0);
  const [input, setInput] = useState('');
  const navigation = useNavigation(); 

  const print = (thing) => {
    console.log(thing);
  };

  let data = [];

  const getResults = (query) => {
    if (query !== '') {
      return fetch(
        `https://finnhub.io/api/v1/search?q=${query}&token=cddjur2ad3iag7bhrel0cddjur2ad3iag7bhrelg`
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          data = json.result.slice(0,100);
          setSearchCount(data.length);
          setSearch(data);
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      setSearch([]);
      setSearchCount(0);
    }
  };

  let timer = null;

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=> navigation.navigate("StockInfo", {data: item})}>
      <Card symbol={item.symbol} description={item.description} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => {
          if (timer !== null) {
            clearTimeout(timer);
          }
          timer = setTimeout(function () {
            getResults(text);
            setInput(text);
          }, 500);
        }}
        style={styles.textBox}
        placeholder="Search Stock Symbol"
        placeholderTextColor="grey"
      />
      {input !== '' && (
        <FlatList
          data={search}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  textBox: {
    padding: 20,
    borderColor: '#00284D',
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 20,
  },
  card: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#00284D',
    borderRadius: 20,

  },
});