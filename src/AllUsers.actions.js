import { getAllUsers } from "./service";

export const FETCH_USERS_FAILED = "FETCH_BOOKS_FAILED";
export const FETCH_USERS_REQUESTED = "FETCH_BOOKS_REQUESTED";
export const FETCH_USERS_SUCCEEDED = "FETCH_BOOKS_SUCCEEDED";

export const fetchUsersSucceded = (users) => ({
  type: FETCH_USERS_SUCCEEDED,
  payload: users,
});

export const fetchUsersFailed = (err) => ({
  type: FETCH_USERS_FAILED,
  payload: err,
});

export const fetchUsersRequested = () => ({
  type: FETCH_USERS_REQUESTED,
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
