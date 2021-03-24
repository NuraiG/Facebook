import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";
import Profile from "./Profile/Profile";
import SignUp from "./LoginPage/SignUp";

function App() {
  let user = "test";

  return (
    <BrowserRouter>
      <div className="App">
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
