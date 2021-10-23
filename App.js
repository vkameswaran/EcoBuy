import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ESG from './screens/ESG'; 
import GroceriesHome from './screens/GroceriesHome';
import { Keyboard, ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import GroceryItem from './components/GroceryItem';
import ItemInputField from './components/ItemInputField'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen name="GroceriesHome" component={GroceriesHome} />
        <Tab.Screen name="ESG" component={ESG} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}





