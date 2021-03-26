import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";
import Profile from "./Profile/Profile";
import SignUp from "./LoginPage/SignUp";

// styles
import "./App.css";
import { globalTheme } from "./customThemes";

// Material-UI
import { Paper } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

function App() {
  let user = "test";

  return (
    <BrowserRouter>
      <ThemeProvider theme={globalTheme}>
        <Paper>
          <div className="App light">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>

              <Route path="/signUp">
                <SignUp />
              </Route>

              <Route path="/profile/:id">
                <Profile />
              </Route>

              <Route exact path="/">
                {user ? <Home /> : <Redirect to="/login" />}
              </Route>

              <Route path="*">
                {/* error page */}
              </Route>
            </Switch>
          </div>
        </Paper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
