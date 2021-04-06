import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import currentUserReducer from "../Profile/CurrentUser.reducer";
import allUsersReducer from "./AllUsers.reducer";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  allUsers: allUsersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk),);

export default store;