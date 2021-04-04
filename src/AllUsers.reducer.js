import {
  FETCH_ALL_USERS_FAILED,
  FETCH_ALL_USERS_REQUESTED,
  FETCH_ALL_USERS_SUCCEEDED,
} from "./AllUsers.actions";

const INITIAL_STATE = {
  allUsers: [],
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_ALL_USERS_SUCCEEDED:
      return {
        ...state,
        allUsers: [...action.payload],
        isLoading: false,
        error: null,
      };

    case FETCH_ALL_USERS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
