import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import currentUserReducer from "./Profile/CurrentUser.reducer";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
});

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;