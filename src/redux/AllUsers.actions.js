import { getAllUsers } from "../firebase/service";

export const FETCH_ALL_USERS_FAILED = "FETCH_ALL_USERS_FAILED";
export const FETCH_ALL_USERS_REQUESTED = "FETCH_ALL_USERS_REQUESTED";
export const FETCH_ALL_USERS_SUCCEEDED = "FETCH_ALL_USERS_SUCCEEDED";

export const fetchUsersSucceded = (users) => ({
  type: FETCH_ALL_USERS_SUCCEEDED,
  payload: users,
});

export const fetchUsersFailed = (err) => ({
  type: FETCH_ALL_USERS_FAILED,
  payload: err,
});

export const fetchUsersRequested = () => ({
  type: FETCH_ALL_USERS_REQUESTED,
});

// Thunk actions
export const fetchAllUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequested());
    getAllUsers().onSnapshot(
      (users) => {
        let dbUsers = [];

        users.forEach((user) => {
          dbUsers.push({ ...user.data(), id: user.id });
        });

        dispatch(fetchUsersSucceded(dbUsers));
      },
      (error) => {
        dispatch(fetchUsersFailed(error));
      }
    );
  };
};
