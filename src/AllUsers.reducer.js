import {
  FETCH_USERS_FAILED,
  FETCH_USERS_REQUESTED,
  FETCH_USERS_SUCCEEDED,
} from "./AllUsers.actions";

const INITIAL_STATE = {
  allUsers: [],
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        allUsers: [...action.payload],
        isLoading: false,
        error: null,
      };

    case FETCH_USERS_FAILED:
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
