import { getUserById } from "../service";
import firebase from "../firebase";

// export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_USER_PROFILE_PICTURE = "UPDATE_USER_PROFILE_PICTURE";
export const UPDATE_USER_COVER_PICTURE = "UPDATE_USER_COVER_PICTURE";
export const ADD_TO_FRINDS_LIST = "ADD_TO_FRINDS_LIST";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const LOGOUT_USER = "LOGOUT_USER";
export const FETCH_CURRENT_USER_FAILED = "FETCH_CURRENT_USER_FAILED";
export const FETCH_CURRENT_USER_REQUESTED = "FETCH_CURRENT_USER_REQUESTED";
export const FETCH_CURRENT_USER_SUCCEEDED = "FETCH_CURRENT_USER_SUCCEEDED";

// export const setCurrentUser = (user) => ({
//   type: SET_CURRENT_USER,
//   payload: user,
// });

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

export const logout_user = () =>({
  type: LOGOUT_USER,
});

export const fetchCurrentUserSucceded = (user) => ({
  type: FETCH_CURRENT_USER_SUCCEEDED,
  payload: user,
});

export const fetchCurrentUserFailed = (err) => ({
  type: FETCH_CURRENT_USER_FAILED,
  payload: err,
});

export const fetchCurrentUserRequested = () => ({
  type: FETCH_CURRENT_USER_REQUESTED,
});


//Thunk actions for current user;

export const fetchCurrentUser = () => {
  return function (dispatch) {
    dispatch(fetchCurrentUserRequested());
    // console.log("FETCH_CURRENT_USER_REQUESTED");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log("Signed in user: ", user);
        getUserById(user.uid).then((res)=>{dispatch(fetchCurrentUserSucceded({...res, id: user.uid}))})
        // console.log("FETCH_CURRENT_USER_SUCCEEDED");
      }
      else{
        dispatch(fetchCurrentUserFailed("FETCH_CURRENT_USER_FAILED"));
        // console.log("FETCH_CURRENT_USER_FAILED");
      }
    })
  }
}



