
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
                console.log(`No such document: ${company} ${itemName}`);
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
                let avgPackaging = await firestore.collection("items").doc(`${company}__${item}`).get().then((doc) => {
                    return doc.data().averagePackaging
                });
                runningTotal += avgPackaging - packagingScore;
            }

            return runningTotal / doc.data().items.length;

        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

}

export default FirestoreUtilities