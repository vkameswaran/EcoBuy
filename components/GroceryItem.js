import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const GroceryItem = (props) => {
    return (
        <View style={[ styles.container, {backgroundColor: props.color} ]}>
            <View style={styles.indexContainer}>
                <Text style={styles.index}>{props.index}</Text>
            </View>
            <View style={[ styles.itemContainer, {backgroundColor: props.color} ]}>
                <Text style={styles.item}>{props.brand}</Text>
                <Text style={styles.item}>{props.item}</Text>
            </View>
            <View style={styles.indexContainer}>
                <TouchableOpacity onPress={() => props.editESG()}>
                    <MaterialIcons style={styles.delete} name="park" size={18} color='#000000' />
                </TouchableOpacity>
            </View>
            <View style={styles.indexContainer}>
                <TouchableOpacity onPress={() => props.deleteItem()}>
                    <MaterialIcons style={styles.delete} name="delete" size={18} color='#000000' />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default GroceryItem;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignContent: 'space-between',
        borderRadius: 12,
        backgroundColor: '#FDF5E6',
        borderWidth: 1,
        borderColor: '#000000',
        width: '600px',
        padding: 8
    },
    indexContainer: {
        
        
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 50,
    },
    index: {
        fontSize: 20,
    },
    itemContainer: {
        backgroundColor: '#FDF5E6',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    item: {
        color: '#000000',
        width: '90%',
        fontSize: 16,
    },
    delete: {
        marginLeft: 10,
    },
});