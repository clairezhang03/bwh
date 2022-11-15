import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import SearchStocks from '../components/SearchStocks'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SearchUsers from '../components/SearchUsers'

export default function SearchScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 15 },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: '#00284D' },
      }}
      style={styles.tabBar}
    >
      <Tab.Screen name="Stocks" component={SearchStocks} />
      <Tab.Screen name="Users" component={SearchUsers} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#00284D",
    flex: 1,
  },
  tabBar: {
    marginTop: Constants.statusBarHeight,    
  },
})