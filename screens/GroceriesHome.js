import React, {Component, useState} from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View, Button} from 'react-native';
import { withNavigation } from 'react-navigation';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import GroceryItem from '../components/GroceryItem';
import ItemInputField from '../components/ItemInputField'
/*
class GroceriesHome extends Component{
    render() {
        return(
            grocery()
        );
    }
}
*/

const GroceriesHome = function (props) {
    const [items, setItems] = useState([]);
  
    const addItem = (brand, item) => {
      if (brand == null || item == null) return;
      setItems([...items, [brand, item]]);
      Keyboard.dismiss();
    }
  
    const deleteItem = (deleteIndex) => {
      setItems(items.filter((item, index) => index != deleteIndex));
    }
  
    const finalizeList = () => {
  
    }
  
    return (
      <View style={styles.container}>
          <Text style={styles.heading}>Groceries</Text>
        <ScrollView style={styles.scrollView}>
          {
          items.map((brandItem, index) => {
            return (
              <View key={index} style={styles.itemContainer}>
                <GroceryItem index={index + 1} brand={brandItem[0]} item = {brandItem[1]} deleteItem={() => deleteItem(index)}/>
              </View>
            );
          })
        }
        </ScrollView>
        <ItemInputField addItem={addItem} />
        <Button
            title="Finalize List"
            onPress={() => finalizeList}
        />
      </View> 
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#1E1A3C',
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
