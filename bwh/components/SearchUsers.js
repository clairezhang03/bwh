import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../core/config'

const Card = (props) => {
  return (
    <View style={styles.card}>
      <Text style={{ color: 'white', fontSize: 18 }}>{props.name}</Text>
      <Text style={{ color: 'white', marginTop: 5 }}>{props.email}</Text>
    </View>
  );
};

export default function SearchUsers() {
  const [search, setSearch] = useState([]);
  const [input, setInput] = useState('');
  const [userDatabase, setUserDatabase] = useState([])
  const navigation = useNavigation();

  useEffect(() => {
    let all_users = []
    getDocs(collection(db, "users")).then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        const miniProfile = {
          fname: doc.data().fname,
          lname: doc.data().lname,
          email: doc.data().email,
          investedStocks: doc.data().investedStocks,
          percent: ((doc.data().balance - 100000) / 100000) * 100,
          balance: doc.data().balance
        }
        all_users.push(miniProfile)
      });
      setUserDatabase(all_users)
    }).catch((e) => alert(e))
  }, [])

  const getResults = (query) => {
    search_results = JSON.parse(JSON.stringify(userDatabase)).filter((item) => {
      let user_info = `${item.fname} ` + `${item.lname} ` + `${item.email}`
      return user_info.toLowerCase().includes(query.toLowerCase())
    });
    setSearch(JSON.parse(JSON.stringify(search_results)));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("OtherUserProfile", { data: item })}>
      <Card name={item.fname + " " + item.lname} email={item.email} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => {
          getResults(text);
          setInput(text);
        }}
        style={styles.textBox}
        placeholder="Search User by First Name, Last Name or Email"
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
  )
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