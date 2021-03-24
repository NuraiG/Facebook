import React from 'react';
import {TextField, Divider, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import facebook from './facebook-loginPage.svg';
const customButton = createMuiTheme({
    palette: {
        primary: {
            main: '#1877f2',
            dark: '#1f65c0',
            contrastText: '#fff'
        },
        secondary: {
            main: '#42b72a',
            dark: '#3f932e',
            contrastText: '#fff'
        }
    }
});

export default function Login() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const setHandlerInputEmail = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setEmail(e.target.value);
    }
    const setHandlerInputPassword = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setPassword(e.target.value);
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
                <ThemeProvider theme={customButton}>
                    <Button color="primary" variant="contained" size="large">Log In</Button>
                </ThemeProvider>
                <Link to='/forgottenPassword'>Forgot Password?</Link>
                <Divider flexItem/> {/* todo: onClick=> login with email and password */}
                <ThemeProvider theme={customButton}>
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
