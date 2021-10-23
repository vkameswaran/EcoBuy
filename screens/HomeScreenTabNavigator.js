import React, {Component} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Button
} from 'react-native';
import {TabNavigator} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ScreenOne from './TabNavigator/ScreenOne'
import ScreenTwo from './TabNavigator/ScreenTwo'

export default HomeScreenTabNavigator = new TabNavigator({
  ScreenOne: {
      
          screen: ScreenOne,
          navigationOptions: {
              tabBarLabel: 'List',
              tabBarIcon: () => {
                  <Ionicons name = "md-compass" size={24}/>
              }
          }
      
  },
  ScreenTwo: {
   
        screen: ScreenTwo,
        navigationOptions: {
            tabBarLabel: 'List',
            tabBarIcon: () => {
                <Ionicons name = "md-compass" size={24}/>
            }
        }
    
}

})

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justidyContent:'center'
    }
});