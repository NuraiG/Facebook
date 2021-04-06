import { getUserById } from "../service";
import firebase from "../firebase";

export const UPDATE_USER_PROFILE_PICTURE = "UPDATE_USER_PROFILE_PICTURE";
export const UPDATE_USER_COVER_PICTURE = "UPDATE_USER_COVER_PICTURE";
export const ADD_TO_FRINDS_LIST = "ADD_TO_FRINDS_LIST";
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const FETCH_CURRENT_USER_FAILED = "FETCH_CURRENT_USER_FAILED";
export const FETCH_CURRENT_USER_REQUESTED = "FETCH_CURRENT_USER_REQUESTED";
export const FETCH_CURRENT_USER_SUCCEEDED = "FETCH_CURRENT_USER_SUCCEEDED";
export const LOG_OUT_CURRENT_USER = "LOG_OUT_CURRENT_USER";

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

export const logOutUser = () => ({
  type: LOG_OUT_CURRENT_USER,
})

//Thunk actions for current user;

export const fetchCurrentUser = () => {
  return function (dispatch) {
    dispatch(fetchCurrentUserRequested());
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getUserById(user.uid).then((res) => {
          dispatch(fetchCurrentUserSucceded({ ...res, id: user.uid }));
        });
      } else {
        dispatch(fetchCurrentUserFailed("FETCH_CURRENT_USER_FAILED"));
      }
    });
  };
};
