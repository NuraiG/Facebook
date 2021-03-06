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
  gender,
  language
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
      images: [],
      friends: [],
      languagePreference: language,
      notificationsLastRead: firebase.firestore.FieldValue.serverTimestamp(),
      registrationDate: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
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

export function getAllUsers() {
  return database.collection("users");
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

export function updateUserBirthPlace(currId, userBirthPlace) {
  database
    .collection("users")
    .doc(currId)
    .update({ birthPlace: userBirthPlace })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error(error);
    });
}

export function updateUserResidence(currId, residence) {
  database
    .collection("users")
    .doc(currId)
    .update({ residence: residence })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error(error);
    });
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
  return Promise.all([
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
      }),
  ]);
}

export function readNotifications(currentUserId) {
  return database.collection("users").doc(currentUserId).update({
    notificationsLastRead: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export function editUser(userId, data) {
  return database
    .collection("users")
    .doc(userId)
    .update({
      ...data,
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
      isDeleted: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      lastModified: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

export function getAllPosts() {
  return database
    .collection("posts")
    .where("isDeleted", "!=", true)
    .orderBy("isDeleted");
}

export function getAllPostsForUser(userId) {
  return database
    .collection("posts")
    .where("isDeleted", "!=", true)
    .where("postTargetId", "==", userId);
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
  // Promise.All([])
  // friendIds.map()
  // database.collection("posts").where("isDeleted", "!=", true).where("postTarget", "==", friendId)
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

// post soft delete
export function deletePost(postId) {
  return database.collection("posts").doc(postId).update({
    isDeleted: true,
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

export function createComment(postId, postAuthorId, commentData) {
  return database
    .collection("comments")
    .doc()
    .set({
      postId: postId,
      postAuthorId: postAuthorId,
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

export function getAllComments() {
  return database.collection("comments").orderBy("timestamp");
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
    .where("status", "==", "pending")
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
      Promise.all([
        addToUserFriends(senderId, receiverId),
        addToUserFriends(receiverId, senderId),
      ])
    );
}

export function rejectFriendRequest(requestId) {
  return database.collection("friendRequests").doc(requestId).update({
    status: "rejected",
    resolvedOn: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export function getActiveFriendRequestsBetweenUsers(
  currentUserId,
  otherUserId
) {
  return database
    .collection("friendRequests")
    .where("from", "==", currentUserId)
    .where("to", "==", otherUserId)
    .where("status", "==", "pending")
    .get();
}

export function logout() {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message);
    });
}
