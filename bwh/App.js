import { StackActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import AuthStateProvider from './core/authstate';
import UserState from './core/userstate';

export default function App() {
  return (
    <UserState>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </UserState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
