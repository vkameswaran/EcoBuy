import { StyleSheet, View, Text } from 'react-native';
import React, {Component, useState} from 'react';
import FirestoreUtilities from '../utils/firebaseUtils';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'

async function loadData() {
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

function calculateOverallAverage(scores) {
    let runningTotal = 0;
    scores.forEach(item => runningTotal += item)
    // console.log(runningTotal)
    // console.log(scores.length)
    // console.log(runningTotal / scores.length)
    return runningTotal / scores.length;
    // console.log(runningTotal)
}

const History = function (props) {
    const [results, setResults] = useState([])
    const [scores, setScores] = useState([])

    loadData().then(data => {
        if (results.length !== data.length) {
            setResults(Array(data.length))
        }
        if (scores.length !== data.length) {
            setScores(Array(data.length))
        }
        data.forEach((x, i) => (x).then(y => {
            const copyOfResults = results
            copyOfResults[i] = `${y.score} ${y.itemsText}`
            setResults(copyOfResults)

            const copyOfScores = scores
            copyOfScores[i] = y.score
            setScores(copyOfScores)
        }))
    })

    return (
        <View style = {styles.container}>
            <Text style={styles.title}>Sustainability Index: {calculateOverallAverage(scores)}</Text>
            <Text style = {styles.customText}>
            {results.map((e, i) => <div key={i}>{e}</div>)}
            </Text>
        </View>
      );

}

const styles = StyleSheet.create({
    customText: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        borderRadius: 12,
        backgroundColor: '#FDF5E6',
        borderWidth: 1,
        borderColor: '#000000',
        width: '600px',
        padding: 8,
        paddingBottom: 5,
        fontStyle: 'italic',
        fontSize: 17,
      },
      title: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 25,
        marginTop: 10,
        marginBottom:10,
        fontSize: 20,

      },
      container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
      }
      


});

export default History;
