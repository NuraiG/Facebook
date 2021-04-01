import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";
import Profile from "./Profile/Profile";
import SignUp from "./LoginPage/SignUp";
import Error from "./ErrorPage/Error";
import Header from "./Header/Header";

// styles
import "./App.css";
import { globalTheme } from "./customThemes";

// Material-UI
import { Paper, ThemeProvider } from "@material-ui/core";
import FriendRequestPage from "./FriendRequestsPage";

//redux
import { useDispatch, useSelector } from "react-redux";

// react
import { useEffect } from "react";

//firebase
import firebase from "./firebase";

// current user actions
import {setCurrentUser} from "./Profile/CurrentUser.actions";

// DB requests
import { getUserById } from "./service";


function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("Signed in user: ", user);
        getUserById(user.uid).then((res)=>{dispatch(setCurrentUser({...res, id: user.uid}))})
      } else {
        console.log("No user");
        dispatch(setCurrentUser(null));
      }
    })
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
        <Paper>
          <div className="App light">
            <Switch>
              <Route exact path="/login">
                {/* when we stop testing, login and sign up page should not be openable when logged in */}
                {/* {user ? <Redirect to="/" /> : <Login />} */}
                <Login />
              </Route>

              <Route exact path="/signUp">
                {/* {user ? <Redirect to="/" /> : <SignUp />} */}
                <SignUp />
              </Route>

              <Route path="/profile/:id">
                <Profile />
              </Route>

              <Route exact path="/friends">
                <Header activeTab="friends" />
                <FriendRequestPage />
              </Route>

              <Route exact path="/">
                {currentUser ? <Home user={currentUser} /> : <Redirect to="/login" />}
              </Route>

              <Route path="*">
                <Error />
              </Route>
            </Switch>
          </div>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
