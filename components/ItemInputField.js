import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, } from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
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
        <KeyboardAwareScrollView 
        style={styles.container},
        resetScrollToCoords={{x:0, y:0}}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        <TextInput style={styles.inputField} value={brand} onChangeText={text => setBrand(text)} placeholder={'Brand'} placeholderTextColor={'#A9A9A9'} clearTextOnFocus={true}/>
        <TextInput style={styles.inputField} value={item} onChangeText={text => setItem(text)} placeholder={'Item'} placeholderTextColor={'#A9A9A9' } clearTextOnFocus={true}/>
        <TouchableOpacity onPress={() => handleAdd(brand, item)}>
          <View style={styles.button}>
              <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
}

export default ItemInputField;

const styles = StyleSheet.create({
    container: {
        borderColor: '#000000',
        backgroundColor: '#FDF5E6',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 60,
    },
    inputField: {
        color: '#000000',
        height: 50,
        textAlign: 'center',
        flex: 1,
        marginBottom:20,
        fontSize:16,
        fontStyle: 'italic'

        
    },
    button: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
    },
});