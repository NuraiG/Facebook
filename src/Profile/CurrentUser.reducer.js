import {
  ADD_TO_FRINDS_LIST,
  SET_CURRENT_USER,
  UPDATE_USER_COVER_PICTURE,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_PICTURE,
} from "./CurrentUser.actions";

const INITIAL_STATE = {
  currentUser: {},
  isLoading: true,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        currentUser: { ...action.payload },
        isLoading: false,
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