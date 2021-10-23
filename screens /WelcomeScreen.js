import React, {Component} from "react-native";
import {
    View, 
    Text,
    StyleSheet,
    Button
} from "react-native";

class WelcomeScreen extends Component{
    render() {
        return(
            <View style={StyleSheet.container}>
                <Button title = "Log in"/>
                <Button title = "Sign up"/>
                </View>
        );
    }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justidyContent:'center'
    }
});