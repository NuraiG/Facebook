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

function App() {
  let user = {
    id: "U99cAvfTmfhuHurhus6D5X2ejfo1",
    profile_image: "",
    firstName: "Елица",
    lastName: "Иванова",
    registrationDate: "March 29, 2021 at 1:47:01 PM UTC+3",
    birthDate: "March 29, 2000 at 1:47:01 PM UTC+3",
    birthPlace: "Sofia",
    residence: "Sofia",
    gender: "Female",
  };

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
                <Profile currentUser={user}/>
              </Route>

              <Route exact path="/friends">
                <Header activeTab="friends" />
                <FriendRequestPage />
              </Route>

              <Route exact path="/">
                {user ? <Home user={user} /> : <Redirect to="/login" />}
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
