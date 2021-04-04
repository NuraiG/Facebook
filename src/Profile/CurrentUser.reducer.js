import {
  ADD_TO_FRINDS_LIST,
  UPDATE_USER_COVER_PICTURE,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_PICTURE,
  FETCH_CURRENT_USER_FAILED,
  FETCH_CURRENT_USER_REQUESTED,
  FETCH_CURRENT_USER_SUCCEEDED,
} from "./CurrentUser.actions";

const INITIAL_STATE = {
  currentUser: {},
  isLoading: true,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_CURRENT_USER_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CURRENT_USER_SUCCEEDED:
      return {
        currentUser: { ...action.payload },
        isLoading: false,
      };
    case FETCH_CURRENT_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case UPDATE_USER_PROFILE_PICTURE:
      return {
        currentUser: { ...state.currentUser, profile_image: action.payload },
        isLoading: false,
      };

    case UPDATE_USER_COVER_PICTURE:
      return {
        currentUser: { ...state.currentUser, cover_image: action.payload },
        isLoading: false,
      };

    case ADD_TO_FRINDS_LIST:
      return {
        currentUser: {
          ...state.currentUser,
          friends: [...state.currentUser.friends, action.payload],
        },
        isLoading: false,
      };

    case UPDATE_USER_PROFILE:
      return {
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
