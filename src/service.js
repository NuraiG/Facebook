import firebase, { database } from "./firebase";

export function register(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function addUserToCollection(
  uid,
  email,
  firstName,
  lastName,
  birthDate,
  gender
) {
  return database
    .collection("users")
    .doc(uid)
    .set({
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      gender: gender,
      registrationDate: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}
