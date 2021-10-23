import React, {Component} from "react-native";
import {
    View, 
    Text,
    StyleSheet
} from "react-native";

class SignUpScreen extends Component{
    render() {
        return(
            <View style={StyleSheet.container}>
                <Text>Login</Text>
                </View>
        );
    }
}
export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justidyContent:'center'
    }
});