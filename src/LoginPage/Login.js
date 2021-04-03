import React, {useState} from 'react';
import {Divider, Button,InputBase} from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './Login.module.scss';
import {ThemeProvider} from '@material-ui/styles';
import facebook from './facebook-loginPage.svg';
import { customButtonBlueGreen } from "../customThemes";
import { login } from '../service';
import { useHistory } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(false);

    const history = useHistory();


    const setHandlerInputEmail = (e) => {
        setEmail(e.target.value);
    }
    const setHandlerInputPassword = (e) => {
        setPassword(e.target.value);
    }
    const onSubmit = () => {
        login(email, password)
        .then((userCredential) => {
            // Signed in
            setError(false);
            let user = userCredential.user;
            console.log(user.uid);
            history.replace("/", { from: "login" })
          })
          .catch((error) => {
              setError(true);
            console.log(error.message);
          });
    }
    return (
        <div className={
            styles.loginPage
        }>
            <div className={
                styles.leftSide
            }>
                <img src={facebook}
                    alt="Facebook"></img>
                <h2>Connect with friends and the world around you on Facebook.</h2>
            </div>
            <form className={
                    styles.login
                }
                autoComplete="off">
                <div className={
                    styles.input
                }>
                    <InputBase id="email"
                        value={email}
                        placeholder="Email"
                        className={styles.inputBase}
                        variant="outlined"
                        required
                        onChange={
                            (e) => setHandlerInputEmail(e)
                        }/>
                    <InputBase id="password"
                        value={password}
                        className={styles.inputBase}
                        placeholder="Password"
                        variant="outlined"
                        required
                        type="password"
                        onChange={
                            (e) => setHandlerInputPassword(e)
                        }/>
                        {error ? <span>Invalid email or password</span> :" "}
                </div>
                <ThemeProvider theme={customButtonBlueGreen}>
                    <Button color="primary" variant="contained" size="large" style={{ fontSize: '14px' }}  onClick={onSubmit}>Log In</Button>
                </ThemeProvider>
                <Link to='/forgottenPassword'>Forgot Password?</Link>
                <Divider flexItem/>
                <ThemeProvider theme={customButtonBlueGreen}>
                    <Link to='/signUp'
                        style={
                            {textDecoration: 'none'}
                    }>
                        <Button color="secondary" variant="contained" style={{ fontSize: '14px' }}  size="large">Create New Account</Button>
                    </Link>
                </ThemeProvider>
            </form>
        </div>
    )
}
