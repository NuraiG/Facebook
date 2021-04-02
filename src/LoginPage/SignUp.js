import React , {useState} from "react";
import { TextField } from "@material-ui/core";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import styles from "./SignUp.module.scss";
import { customButtonBlueGreen } from "../customThemes";
import { ThemeProvider } from "@material-ui/styles";
import { addUserToCollection, register } from "../service";
import { getTimestampFromDate } from "../timeUtils";
import {validateEmail, validatePassword,validateNames,validateDate } from "../validate";
import { useHistory } from "react-router-dom";

export default function Registration() {

  let currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'-'); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bDate, setbDate] = useState(currentDate);
  const [gender, setGender] = useState("Other");

  const [error, setError] = useState("");

  const history = useHistory();

 
  const setHandlerGender = (e) => {
    setGender(e.target.value);
  };
  const onChangeHandler = (e) => {
    let value = e.target.value;
    let inputId = e.target.id;
    switch (inputId) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "date":
        setbDate(value);
        break;
      // case "gender":
      //     setGender(value);
      //     break;
      case "password":
        setPassword(value);
        break;
      default:
    }
  };

  let onSubmit = () => {
    console.log(bDate);
    console.log(getTimestampFromDate(bDate));
    
    register(email, password)
    .then((userCredential) => {
      // Signed in
      setError("");
      let user = userCredential.user;
      console.log(user.uid);
      let uid = user.uid;
      history.replace("/", { from: "login" })
     
        addUserToCollection(
          uid,
          email,
          firstName,
          lastName,
          getTimestampFromDate(bDate),
          gender
        );
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <>
      <div className={styles.signUp}>
        <div className={styles.container1}>
          <h2>Sign Up</h2>
          <p>It’s quick and easy.</p>
          <div className={styles.names}>
          <div>
            <TextField
              id="firstName"
              value={firstName}
              placeholder="First name"
              variant="outlined"
              required
              style={{ alignSelf: "flex-start" }}
              onChange={(e) => onChangeHandler(e)}
            />
            { !validateNames(firstName) ? <span>The first name must start with capital letter</span> : ""}
           </div>
           <div>
            <TextField
              placeholder="Last name"
              id="lastName"
              value={lastName}
              variant="outlined"
              required
              style={{ alignSelf: "flex-end" }}
              onChange={(e) => onChangeHandler(e)}
            />
            {!validateNames(lastName) ? <span>The last name must start with capital letter</span> : ""}
            </div>
          </div>
          <div className={styles.additional}>
           
            <TextField
              id="email"
              value={email}
              placeholder="Email"
              variant="outlined"
              required
              onChange={(e) => onChangeHandler(e)}
            />
            {!validateEmail(email) ? <span>Invalid email</span> : ""}
            <TextField
              id="password"
              value={password}
              placeholder="New password"
              variant="outlined"
              required
              type="password"
              onChange={(e) => onChangeHandler(e)}
            />
            {!validatePassword(password) ? <span>Password must contain more than 6 characters</span> : "" }
            <TextField
              label="Birthday"
              id="date"
              value={bDate}
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => onChangeHandler(e)}
            />
            {!validateDate(bDate) ? <span>You must be over 14 years old</span> : "" }
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ textAlign: "start" }}>
                Gender
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                id="gender"
                value={gender}
                onChange={(e) => setHandlerGender(e)}
                row
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio color="default" />}
                  labelPlacement="start"
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio color="default" />}
                  labelPlacement="start"
                  label="Male"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio color="default" />}
                  labelPlacement="start"
                  label="Custom"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <p>
            By clicking Регистрация, you agree to our
            <a href="https://www.facebook.com/legal/terms/update">Terms</a>.
            Learn how we collect, use and share your data in our
            <a href="https://www.facebook.com/about/privacy/update">
              Data Policy
            </a>
            and how we use cookies and similar technology in our
            <a href="https://www.facebook.com/policies/cookies/">
              Cookies Policy
            </a>
            . You may receive SMS Notifications from us and can opt out any
            time.
          </p>
          {/* todo: sign up on click */}
          <ThemeProvider theme={customButtonBlueGreen}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              onClick={onSubmit}
              disabled={
                validateEmail(email) && 
                validateNames(firstName) && 
                validateNames(lastName) && 
                validateDate(bDate) && 
                validatePassword(password) ? false : true
              }
            >
              Sign Up
            </Button>
          </ThemeProvider>
        </div>
        {error ?<span> {error}</span> : ""}
      </div>
    </>
  );
}
