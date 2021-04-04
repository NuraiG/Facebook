import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";
import Profile from "./Profile/Profile";
import SignUp from "./LoginPage/SignUp";
import Error from "./ErrorPage/Error";
import Header from "./Header/Header";
import Loader from "./common/Loader/Loader"

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


// current user actions
import {fetchCurrentUser} from "./Profile/CurrentUser.actions";
import {fetchAllUsers} from "./AllUsers.actions";



function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const isLoading = useSelector((state) => state.currentUser.isLoading);
  
  useEffect(() => {
    
    dispatch(fetchCurrentUser());

    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
        <Paper className="body">
          <div className="App light">
          { !isLoading ? 
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
             : <Loader /> }
          </div>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
