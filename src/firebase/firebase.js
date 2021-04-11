import firebase from "firebase";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
var storage = firebase.storage();

export default firebase;

export { database, storage };
