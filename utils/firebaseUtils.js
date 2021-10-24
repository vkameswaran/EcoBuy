
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDlv8LRNcQo6XxFapZVEYMUkhOqTRBLp8s",
    authDomain: "ecobuy-hackgt.firebaseapp.com",
    projectId: "ecobuy-hackgt",
    storageBucket: "ecobuy-hackgt.appspot.com",
    messagingSenderId: "193963581215",
    appId: "1:193963581215:web:49aa52cadf55a083599a2a"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

class FirestoreUtilities {

    /**
     * Gets information on a particular product from Firebase, based on the company and item name.
     *
     * @param company the manufacturer of the item
     * @param itemName the specific item that was bought
     * @returns {Promise<*>} a dictionary of information about the item
     */
    static getItem = async (company, itemName) => {

        var docRef = firestore.collection("items").doc(`${company.toLowerCase()}__${itemName.toLowerCase()}`);

        return docRef.get().then((doc) => {
            if (doc.exists) {
                return doc.data();
            } else {
                return undefined;
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    };

    /**
     * Return a score for how good or bad a shopping trip was, compared to the average.
     *
     * @param shoppingTripId the Firebase document id for the shopping trip
     * @returns {Promise<*>} an integer representing the average score for the trip
     */
    static getShoppingTripScore = async (shoppingTripId) => {

        var docRef = firestore.collection("shoppingTrips").doc(shoppingTripId);

        return docRef.get().then(async (doc) => {
            if (!doc.exists) {
                console.log(`No such shopping trip: ${shoppingTripId}`);
                return;
            }

            let runningTotal = 0;

            for (let i in doc.data().items) {
                let [company, item, packagingScore] = doc.data().items[i].split("__");
                runningTotal += parseInt(packagingScore);
            }

            return runningTotal / doc.data().items.length;

        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    /**
     * This function handles all backend updates when a user submits a new shopping list.
     *
     * @param userShoppingList an array of objects, each containing a company (optional), itemName, and score (1-5)
     * @returns {Promise<void>}
     */
    static saveNewShoppingTrip = async (userShoppingList) => {
        const defaultCompany = "default";

        if (!firebase.auth().currentUser) {
            console.log("No email found.");
            console.log(firebase.auth().currentUser);
            return;
        }
        // Find each item in `items`
        // Update the aggregate score for each item on the list
        // Form a list consisting of strings `company__item__packaging`
        const runningList = [];

        for (let i in userShoppingList) {
            const userItem = userShoppingList[i];
            const actualCompany = userItem.company.toLowerCase() || defaultCompany.toLowerCase();
            const realItem = await this.getItem(actualCompany, userItem.itemName);
            console.log(realItem);
            const toWrite = realItem ? {
                averagePackaging: (realItem.numberOfRatings * realItem.averagePackaging + userItem.score) / (realItem.numberOfRatings + 1),
                numberOfRatings: realItem.numberOfRatings + 1
            } : {
                company: FirestoreUtilities.capitalizeFirstLetter(actualCompany),
                itemName: FirestoreUtilities.capitalizeFirstLetter(userItem.itemName),
                averagePackaging: 0,
                numberOfRatings: 0
            };
            await firestore.collection("items").doc(`${actualCompany}__${userItem.itemName.toLowerCase()}`).set(
                toWrite, { merge: true }
            ).then(() => {
                    console.log("Document successfully written!");
                    runningList.push(`${actualCompany}__${userItem.itemName.toLowerCase()}__${userItem.score}`)
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }

        // Add this list to `shoppingTrips`, with the current timestamp
        console.log("Adding " + runningList + " to database");
        const shoppingListRef = await firestore.collection("shoppingTrips").add({
            items: runningList,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });

        // Add the shopping trip to the user's list of trips
        console.log("Adding " + shoppingListRef + " to user trips");
        console.log(firebase.auth().currentUser.email);
        const userRef = firestore.collection("users").doc(firebase.auth().currentUser.email)
        userRef.get().then(data => data.data().trips).then((oldTrips) => {
            oldTrips.push(shoppingListRef)
            userRef.set({
                trips: oldTrips
            })
        }).then(() => {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    };

    /**
     * Helper function to capitalize the first letter of a string.
     *
     * @param s the input string, e.g. "milk"
     * @returns {string} the output string, e.g. "Milk"
     */
    static capitalizeFirstLetter = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

}

export default FirestoreUtilities