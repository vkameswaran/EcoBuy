import React, {Component, useState} from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Modal} from 'react-native';
import { withNavigation } from 'react-navigation';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import GroceryItem from '../components/GroceryItem';
import ItemInputField from '../components/ItemInputField'
import FirestoreUtilities from '../utils/firebaseUtils'

const GroceriesHome = function (props) {
    const [items, setItems] = useState([]);
    const [packData, setPackData] = useState([]);

    function computeColor(avgPack) {
      if (avgPack == undefined) {
        return '#FFFFFF'
      }
      if (avgPack <= 1.25) {
        return '#1ea628'
      } if (avgPack <= 1.75) {
        return '#579800'
      } if (avgPack <= 2.25) {
        return '#768900'
      } if (avgPack <= 2.75) {
        return '#8d7800'
      } if (avgPack <= 3.25) {
        return '#9f6400'
      } if (avgPack <= 3.75) {
        return '#ad4e00'
      } if (avgPack <= 4.25) {
        return '#b53200'
      }
      return '#b80220'
    }
    const addItem = (brand, item) => {
      if (brand == null || item == null) return;
      //console.log(FirestoreUtilities.getItem(brand, item))
      
      var _ = FirestoreUtilities.getItem(brand, item).then(result => {
        if (result == undefined) {
          setPackData([...packData, [null, '#FFFFFF']])
        } else {
          setPackData([...packData, [result.averagePackaging, computeColor(result.averagePackaging)]])
        }
        setItems([...items, [brand, item]]);
        //console.log(computeColor(result.averagePackaging))
      });
      //console.log(avgPackaging)
      
      Keyboard.dismiss();
    }
  
    const deleteItem = (deleteIndex) => {
      setItems(items.filter((item, index) => index != deleteIndex));
      setPackData(packData.filter((pd, index) => index != deleteIndex));
    }

    const editESG = (editIndex) => {
      //this.displayModal(true);
    }
  
    const finalizeList = () => {
      //[[brand1, item1], [brand2, item2],...]
      //[[avgPacking or updated, item1], [brand2, item2],...]
      //console.log(items)
      //console.log(packData)
      let x = items.map((item, index) => {
        return {company : item[0], itemName: item[1], score: packData[index][0]}
      })
      FirestoreUtilities.saveNewShoppingTrip(x);
      setItems([]);
      setPackData([]);
    }
  
    return (
      <View style={styles.container}>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
          {
          items.map((itemData, index) => {
            return (
              <View key={index} style={styles.itemContainer}>
                <GroceryItem index={index + 1} brand={itemData[0]} item = {itemData[1]} packaging = {packData[index][0]} color = {packData[index][1]} deleteItem={() => deleteItem(index)} editESG ={() => editESG(index)}/>
              </View>
            );
          })
        }
        </ScrollView>
        <ItemInputField addItem={addItem} />
       
        <TouchableOpacity onPress={() => finalizeList()} style={styles.finalize}>
          <Text>
            Finalize List
          </Text>
        </TouchableOpacity>
      </View> 
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      // alignSelf: 'center'
    },
    scrollContainer: {

      alignItems: 'center'
    },
    finalize: {
      marginTop: 15,
      marginBottom: 15,
      backgroundColor: "orange",
      color: 'black',
      padding: 15,
      borderRadius: 15
    },
    heading: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '600',
      marginTop: 30,
      marginBottom: 10,
      marginLeft: 20,
    },
    scrollView: {
      marginBottom: 30,
    },
    itemContainer: {
      marginTop: 20,
    },
    horizcontainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: '#1E1A3C'
    }
  });


export default withNavigation(GroceriesHome);
