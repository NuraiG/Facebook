import { createStore, combineReducers} from "redux";
import currentUserReducer from "./Profile/CurrentUser.reducer";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
});

const store = createStore(rootReducer);

export default store;