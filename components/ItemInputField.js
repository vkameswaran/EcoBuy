import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

const ItemInputField = (props) => {
    const [brand, setBrand] = useState();
    const [item, setItem] = useState();


    const handleAdd = (brand, item) => {
        props.addItem(brand, item);
        setBrand(null);
        setItem(null);
    }

    return (
        <KeyboardAvoidingView 
        style={styles.container}
      >
        <TextInput style={styles.inputField} value={brand} onChangeText={text => setBrand(text)} placeholder={'Brand'} placeholderTextColor={'hsla(360, 100%, 100%, 0.5)'} clearTextOnFocus={true}/>
        <TextInput style={styles.inputField} value={item} onChangeText={text => setItem(text)} placeholder={'Item'} placeholderTextColor={'hsla(360, 100%, 100%, 0.5)' } clearTextOnFocus={true}/>
        <TouchableOpacity onPress={() => handleAdd(brand, item)}>
          <View style={styles.button}>
              <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
}

export default ItemInputField;

const styles = StyleSheet.create({
    container: {
        borderColor: '#fff',
        backgroundColor: '#3E3364',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
    },
    inputField: {
        color: '#fff',
        height: 50,
        textAlign: 'center',
        flex: 1,
    },
    button: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});