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

export function createPost(postData) {
  return database
    .collection("posts")
    .doc()
    .set({
      ...postData,
      numberOfComments: 0,
      likes: [],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      lastModified: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function getNumberOfPostsForUser(userId) {
  return database
    .collection("posts")
    .where("postTargetId", "==", userId)
    .get()
    .then((querySnapshot) => querySnapshot.size);
}

export function getAllPostsForUser(userId, start = 0) {
  return database
    .collection("posts")
    .where("postTargetId", "==", userId)
    .orderBy("timestamp", "desc")
    .startAfter(start)
    .limit(2)
    .get();
}

export function getAllPostsForNewsfeed(userId) {
  return database
    .collection("users")
    .doc(userId)
    .get()
    .then((res) => console.log(res));
  // get all friends ids
  // Promise.All()
  // friendIds.map()
  // database.collection("posts").where("postTarget", "==", friendId)
}

export function updatePost(postId, dataToUpdate) {
  return database
    .collection("posts")
    .doc(postId)
    .update({
      ...dataToUpdate,
      lastModified: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function likePostRequest(postId, currentUserId, toLike) {
  return database
    .collection("posts")
    .doc(postId)
    .update({
      likes: toLike
        ? firebase.firestore.FieldValue.arrayUnion(currentUserId)
        : firebase.firestore.FieldValue.arrayRemove(currentUserId),
    });
}

export function createComment(postId, commentData) {
  return database
    .collection("comments")
    .doc()
    .set({
      postId: postId,
      ...commentData,
      likes: [],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      lastModified: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() =>
      database
        .collection("posts")
        .doc(postId)
        .update({
          numberOfComments: firebase.firestore.FieldValue.increment(1),
        })
    );
}

export function likeCommentRequest(commentId, currentUserId, toLike) {
  return database
    .collection("comments")
    .doc(commentId)
    .update({
      likes: toLike
        ? firebase.firestore.FieldValue.arrayUnion(currentUserId)
        : firebase.firestore.FieldValue.arrayRemove(currentUserId),
    });
}

export function getCommentsForPost(postId) {
  return (
    database
      .collection("comments")
      .where("postId", "==", postId + "")
      .orderBy("timestamp", "desc")
      // .startAfter(1)
      // .limit(5)
      .get()
  );
}
