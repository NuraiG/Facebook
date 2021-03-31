import React from 'react';
import {TextField, Divider, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './Login.module.scss';
import {ThemeProvider} from '@material-ui/styles';
import facebook from './facebook-loginPage.svg';
import { customButtonBlueGreen } from "../customThemes";
import { login } from '../service';

import {useSelector} from 'react-redux';

export default function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const setHandlerInputEmail = (e) => {
        setEmail(e.target.value);
    }
    const setHandlerInputPassword = (e) => {
        setPassword(e.target.value);
    }

    // const currentUser =

    const onSubmit = () => {
        login(email, password)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;
            console.log("User credential login",userCredential);
            console.log(user.uid);
          })
          .catch((error) => {
            console.log(error);
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
