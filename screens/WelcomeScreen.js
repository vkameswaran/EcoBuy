import React, {Component} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Button
} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { withNavigation } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';


class WelcomeScreen extends Component{
    
    

    render() {
        return(
            
            <View style={StyleSheet.container}>
                <Button title = "Log in" onPress={
                    () => useNavigation().navigate('LoginScreen')
                }/>
                <Button title = "Sign up"/>
                </View>
        );
    }
}

export default withNavigation(WelcomeScreen);

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});