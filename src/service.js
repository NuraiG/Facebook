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

// should not be exported as it should only be used in combination with the freind requests
function addToUserFriends(currentUserId, friendId) {
  return database
    .collection("users")
    .doc(currentUserId)
    .update({
      friends: firebase.firestore.FieldValue.arrayUnion(friendId),
    });
}

export function removeFromFriends(currentUserId, friendId) {
  return Promise.all(
    database
      .collection("users")
      .doc(currentUserId)
      .update({
        friends: firebase.firestore.FieldValue.arrayRemove(friendId),
      }),
    database
      .collection("users")
      .doc(friendId)
      .update({
        friends: firebase.firestore.FieldValue.arrayRemove(currentUserId),
      })
  );
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

export function getAllPostsForUser(userId) {
  return database.collection("posts").where("postTargetId", "==", userId);
}

// data can't be sorted by date descending when using pagination
// export function getAllPostsForUserTest(userId, start = null) {
//   return database
//     .collection("posts")
//     .where("postTargetId", "==", userId)
//     .orderBy("timestamp", "desc")
//     .startAfter(start)
//     .limit(3)
// }

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
  return database
    .collection("comments")
    .where("postId", "==", postId + "")
    .orderBy("timestamp");
  // .startAfter(1)
  // .limit(5)
}

export function sendFriendRequest(senderId, receiverId) {
  return database.collection("friendRequests").doc().set({
    from: senderId,
    to: receiverId,
    status: "pending",
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export function getMyFriendRequests(currentUserId) {
  return database
    .collection("friendRequests")
    .where("to", "==", currentUserId)
    .orderBy("timestamp", "desc");
}

export function acceptFriendRequest(requestId, senderId, receiverId) {
  return database
    .collection("friendRequests")
    .doc(requestId)
    .update({
      status: "accepted",
      resolvedOn: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() =>
      Promise.all(
        addToUserFriends(senderId, receiverId),
        addToUserFriends(receiverId, senderId)
      )
    );
}

export function rejectFriendRequest(requestId) {
  return database.collection("friendRequests").doc(requestId).update({
    status: "rejected",
    resolvedOn: firebase.firestore.FieldValue.serverTimestamp(),
  });
}