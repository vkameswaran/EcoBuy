import { StyleSheet, View, Text } from 'react-native';
import React, {Component, useState} from 'react';
import FirestoreUtilities from '../utils/firebaseUtils';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'

async function loadData() {
    // FirestoreUtilities.getUserHistory().then(x => {
    //     // console.log(x)
    //     const contents = x.map(async y => await FirestoreUtilities.getItemsFromTrip(y))
    //     const scores = x.map(y => FirestoreUtilities.getShoppingTripScore(y))
    //     // console.log(contents)
    //     return {contents, scores}
    // }).then(({contents, scores}) => {
    //     contents.map(x => {(x).then(orderContents => {
    //         return orderContents.items
    //     })})
    // })
    const data = await FirestoreUtilities.getUserHistory()
    const returnValue = await data.map(async id => {
        const items = await FirestoreUtilities.getItemsFromTrip(id)
        const score = await FirestoreUtilities.getShoppingTripScore(id)
        const itemsText = items.items.map(item => {
            const [itemCompany, itemId, itemScore] = item.split("__")
            return `${itemCompany}'s ${itemId}`
        })
        return {
            itemsText: itemsText,
            score: score
        }
    });
    return returnValue
}

const History = function (props) {
    const [results, setResults] = useState([])

    loadData().then(data => {
        if (results.length !== data.length) {
            setResults(Array(data.length))
        }
        data.forEach((x, i) => (x).then(y => {
            // setResults([...results, <View key={i}><Text>{y.score} {y.itemsText}</Text></View>])
            // console.log(y, i)
            const copyOfResults = results
            copyOfResults[i] = `${y.score} ${y.itemsText}`
            setResults(copyOfResults)
        }))
    })

    return (
        results.map((e, i) => <div key={i}>{e}</div>)
      );

}

const styles = StyleSheet.create({

});

export default History;
