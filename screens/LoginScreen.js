import React, {Component} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    Button
} from 'react-native';
import { withNavigation } from 'react-navigation';
import {createStackNavigator, createAppContainer} from 'react-navigation';

class LoginScreen extends Component{
    render() {
        return(
            <View style={StyleSheet.container}>
                <Text>Login</Text>
                </View>
        );
    }
}
export default withNavigation(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});