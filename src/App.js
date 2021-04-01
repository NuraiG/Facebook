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

import { getUserById } from "./service";


function App() {
  
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser.currentUser);
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          getUserById(user.uid).then((res)=>{dispatch(setCurrentUser({...res, id: user.uid}))})
      } else {
        dispatch(setCurrentUser(null));
      }
    })
  }, [dispatch])

  
  console.log("CurrentUser here id:",currentUser.id);
  console.log("CurrentUser here:", currentUser.firstName);
  console.log("CurrentUser here:",currentUser);

  // let user = {
  //   id: "U99cAvfTmfhuHurhus6D5X2ejfo1",
  //   profile_image: "",
  //   firstName: "Елица",
  //   lastName: "Иванова",
  //   registrationDate: "March 29, 2021 at 1:47:01 PM UTC+3",
  //   birthDate: "March 29, 2000 at 1:47:01 PM UTC+3",
  //   birthPlace: "Sofia",
  //   residence: "Sofia",
  //   gender: "Female",
  // };
  

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
                <Profile currentUser={currentUser}/>
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
