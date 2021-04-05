import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";
import Profile from "./Profile/Profile";
import SignUp from "./LoginPage/SignUp";
import Error from "./ErrorPage/Error";
import Header from "./Header/Header";
import Loader from "./common/Loader/Loader";

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
import { fetchCurrentUser } from "./Profile/CurrentUser.actions";
import { fetchAllUsers } from "./AllUsers.actions";

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
            {!isLoading ? (
              <Switch>
                <Route exact path="/login">
                  {currentUser.id ? <Redirect to="/" /> : <Login />}
                </Route>

                <Route exact path="/signUp">
                  {currentUser.id ? <Redirect to="/" /> : <SignUp />}
                </Route>

                <Route path="/profile/:id">
                  {currentUser.id ? <Profile /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/friends">
                  {currentUser.id ? (
                    <>
                      <Header activeTab="friends" />
                      <FriendRequestPage />
                    </>
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>

                <Route exact path="/">
                  {currentUser.id ? (
                    <Home user={currentUser} />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>

                <Route path="*">
                  {currentUser.id ? <Error /> : <Redirect to="/login" />}
                </Route>
              </Switch>
            ) : (
              <Loader />
            )}
          </div>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
