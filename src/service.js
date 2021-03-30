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

// update bio
export function updateUserBio(currId, userBio) {
  database
    .collection("users")
    .doc(currId)
    .update({ bio: userBio })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error(error);
    });
}
// get data for user by id
export function getUserById(userId) {
  return database
    .collection("users")
    .doc(userId)
    .get()
    .then((res) => res.data());
  // .then((res) => console.log(res.data()));
}
export function editProfileImage(userId, newImage) {
  return database
    .collection("users")
    .doc(userId)
    .update({
      profile_image: newImage,
      images: firebase.firestore.FieldValue.arrayUnion(newImage),
    })
    .then(() => {
      console.log("Document successfully written!");
      console.log("Profile image", newImage);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function editCoverImage(userId, newImage) {
  return database
    .collection("users")
    .doc(userId)
    .update({
      cover_image: newImage,
      images: firebase.firestore.FieldValue.arrayUnion(newImage),
    })
    .then(() => {
      console.log("Document successfully written!");
      console.log("Cover image", newImage);
    })
    .catch((error) => {
      console.error(error);
    });
}
