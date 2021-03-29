import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCFIdLKLDrCiCuZX4herbFTdCRDDuuFry4",
  authDomain: "facebook-clone-b49c9.firebaseapp.com",
  projectId: "facebook-clone-b49c9",
  storageBucket: "facebook-clone-b49c9.appspot.com",
  messagingSenderId: "1075443830323",
  appId: "1:1075443830323:web:e0c5424ede8381cccf9d46",
  measurementId: "G-43C3G6MNHR",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
var storage = firebase.storage();

export default firebase;

export { database, storage };
