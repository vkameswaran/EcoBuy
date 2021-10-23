import React, {Component} from "react-native";
import {
    View, 
    Text,
    StyleSheet
} from "react-native";

class LoginScreen extends Component{
    render() {
        return(
            <View style={StyleSheet.container}>
                <Text>Login</Text>
                </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justidyContent:'center'
    }
});