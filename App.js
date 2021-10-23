import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreen from './screens/SignUpScreen'; 
import LoginScreen from './screens/LoginScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="SignUp" component={SignUpScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import { createStackNavigator } from '@react-navigation/stack';
// import WelcomeScreen from './screens/WelcomeScreen';


// import { render } from 'react-dom';
// import { withNavigation } from 'react-navigation';
// import HomeScreenTabNavigator from './screens/HomeScreenTabNavigator';
// import ScreenOne from './screens/TabNavigator/ScreenOne'
// import ScreenTwo from './screens/TabNavigator/ScreenTwo'


// export default function App() {
//   return <HomeScreenTabNavigator/>;
// }


// const Stack = createStackNavigator();

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="welcome" component={WelcomeScreen} />
//       <Stack.Screen name="login" component={LoginScreen} />
//       <Stack.Screen name="sigup" component={SignUpScreen} />
 
//     </Stack.Navigator>
//   );
// }

// // const AppStackNavigator = new createStackNavigator({
// //   WelcomeScreen: {screen: WelcomeScreen},
// //   LoginScreen: {screen: LoginScreen},
// //   SignUpScreen: {screen: SignUpScreen},

// // })

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
