import { getUserById } from "../service";
import  { database } from "../firebase";

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_USER_PROFILE_PICTURE = "UPDATE_USER_PROFILE_PICTURE";
export const UPDATE_USER_COVER_PICTURE = "UPDATE_USER_COVER_PICTURE";
export const ADD_TO_FRINDS_LIST = "ADD_TO_FRINDS_LIST";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const updateUserProfilePic = (url) => ({
  type: UPDATE_USER_PROFILE_PICTURE,
  payload: url,
});

export const updateUserCoverPic = (url) => ({
  type: UPDATE_USER_COVER_PICTURE,
  payload: url,
});

export const addToFriendsList = (friendId) => ({
  type: ADD_TO_FRINDS_LIST,
  payload: friendId,
});

export const updateUserProfile = (updatetedData) => ({
  type: UPDATE_USER_PROFILE,
  payload: updatetedData,
});


//thunk
// export const fetchCurrentUser = (userId) => {
//   return function (dispatch, getState) {
//     const currentUser = getState().currentUser.currentUser;

//     if (!currentUser.length) {
//       dispatch(setCurrentUser());
//       getUserById(userId)
//         .then((user) => {
//           dispatch(setCurrentUser(user))
//         })
//         .catch((err) => {
//           // dispatch(fetchPostsFailed(err));
//         });
//     }
//   };
// };


//thunk
// export const subscribeToRealTimeUsers = (url) => {
//   return function (dispatch, getState) {
//     database.collection("users").onSnapshot((snapshot) => {
//       // code....
//       // if new post was added:
//       dispatch(updateUserProfilePic(url));
//     });
//   };
// };
