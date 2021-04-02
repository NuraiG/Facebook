import React, {useState} from 'react';
import {TextField, Divider, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './Login.module.scss';
import {ThemeProvider} from '@material-ui/styles';
import facebook from './facebook-loginPage.svg';
import { customButtonBlueGreen } from "../customThemes";
import { login } from '../service';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState(false);


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
            setError(true);
            let user = userCredential.user;
            console.log(user.uid);
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
                    <TextField id="email"
                        value={email}
                        placeholder="Email"
                        variant="outlined"
                        required
                        onChange={
                            (e) => setHandlerInputEmail(e)
                        }/>
                    <TextField id="password"
                        value={password}
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
                    <Button color="primary" variant="contained" size="large" onClick={onSubmit}>Log In</Button>
                </ThemeProvider>
                <Link to='/forgottenPassword'>Forgot Password?</Link>
                <Divider flexItem/>
                <ThemeProvider theme={customButtonBlueGreen}>
                    <Link to='/signUp'
                        style={
                            {textDecoration: 'none'}
                    }>
                        <Button color="secondary" variant="contained" size="large">Create New Account</Button>
                    </Link>
                </ThemeProvider>
            </form>
        </div>
    )
}
