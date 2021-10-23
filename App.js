import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ESG from './screens/ESG';
import GroceriesHome from './screens/GroceriesHome';
import { Keyboard, ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import GroceryItem from './components/GroceryItem';
import ItemInputField from './components/ItemInputField'

import './utils/firebaseUtils'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'
import {StyledFirebaseAuth} from "react-firebaseui";

const Tab = createBottomTabNavigator();

export default function App() {
    const [uiConfig, setUiConfig] = React.useState({
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ]
    });
    const [loggedInUser, setLoggedInUser] = React.useState(undefined);

    firebase.auth().onAuthStateChanged((user) => {
        setLoggedInUser(user)
    });

    // firebase.auth().signOut()
    return (
        loggedInUser === undefined ? "" : (loggedInUser
            ? <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Groceries" component={GroceriesHome} />
                    <Tab.Screen name="ESG" component={ESG} />
                </Tab.Navigator>
            </NavigationContainer>
            :
            <div style={{"padding-top": "20vh"}}>
                <h1 style={{"text-align": "center", "font-family": "Roboto"}}>Welcome to EcoBuy</h1>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>)
    );
}
