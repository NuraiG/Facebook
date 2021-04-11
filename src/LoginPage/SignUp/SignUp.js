import React , {useState} from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  InputBase,
} from "@material-ui/core";
import styles from "./SignUp.module.scss";
import { customButtonBlueGreen } from "../../customThemes";
import { ThemeProvider } from "@material-ui/styles";
import { addUserToCollection, register } from "../../firebase/service";
import { getTimestampFromDate } from "../../utils/timeUtils";
import { validateEmail, validatePassword,validateNames,validateDate } from "../../utils/validationUtils";
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

  const [isValidUserName, setIsValidUserName]= useState(true);
  const [isValidLastName, setIsValidLastName]= useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword]= useState(true);
  const [isValidAge, setIsValidAge] = useState(true);

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
          email.trim(),
          firstName.trim(),
          lastName.trim(),
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
            <InputBase
              id="firstName"
              className={styles.inputBase}
              value={firstName}
              placeholder="First name"
              variant="outlined"
              required
              style={{ alignSelf: "flex-start" }}
              onChange={(e) => onChangeHandler(e)}
              onBlur={()=> (setIsValidUserName(validateNames(firstName)))}
            />
            { !isValidUserName ? <span>The first name must contain at least 2 characters</span> : ""}
           </div>
           <div>
            <InputBase
              placeholder="Last name"
              id="lastName"
              className={styles.inputBase}
              value={lastName}
              variant="outlined"
              required
              style={{ alignSelf: "flex-end" }}
              onChange={(e) => onChangeHandler(e)}
              onBlur={()=> (setIsValidLastName(validateNames(lastName)))}
            />
            {!isValidLastName ? <span>The last name must contain at least 2 characters</span> : ""}
            </div>
          </div>
          <div className={styles.additional}>
           
            <InputBase
              id="email"
              value={email}
              className={styles.inputBase}
              placeholder="Email"
              variant="outlined"
              required
              onChange={(e) => onChangeHandler(e)}
              onBlur={()=> (setIsValidEmail(validateEmail(email)))}
            />
            {!isValidEmail ? <span>Invalid email</span> : ""}
            <InputBase
              id="password"
              className={styles.inputBase}
              value={password}
              placeholder="New password"
              variant="outlined"
              required
              type="password"
              onChange={(e) => onChangeHandler(e)}
              onBlur={()=> (setIsValidPassword(validatePassword(password)))}
            />
            {!isValidPassword ? <span>Password must contain more than 6 characters</span> : "" }
            <InputBase
              label={<h5>Birthday</h5>}
              className={styles.inputBase}
              id="date"
              value={bDate}
              type="date"
              inputlabelprops={{ shrink: true }}
              onChange={(e) => onChangeHandler(e)}
              onBlur={()=> (setIsValidAge(validateDate(bDate)))}
            />
            {!isValidAge ? <span>You must be over 14 years old</span> : "" }
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ textAlign: "start" }}>
                <h5>Gender</h5>
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
                  label={<h5>Female</h5>}
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio color="default" />}
                  labelPlacement="start"
                  label={<h5>Male</h5>}
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio color="default" />}
                  labelPlacement="start"
                  label={<h5>Custom</h5>}
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
          <ThemeProvider theme={customButtonBlueGreen}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              onClick={onSubmit}
              style={{ fontSize: '14px' }} 
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
