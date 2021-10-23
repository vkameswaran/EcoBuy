import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen'; 
import LoginScreen from './screens/LoginScreen';


export default function App() {
  return  <WelcomeScreen/>

    //<AppStackNavigator />
  ;
}


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="sigup" component={SignUpScreen} />
 
    </Stack.Navigator>
  );
}

// const AppStackNavigator = new createStackNavigator({
//   WelcomeScreen: {screen: WelcomeScreen},
//   LoginScreen: {screen: LoginScreen},
//   SignUpScreen: {screen: SignUpScreen},

// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
