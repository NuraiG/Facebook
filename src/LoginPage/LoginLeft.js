import React from 'react';
import {TextField, Divider, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './LoginLeft.module.css';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
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
            contrastText: '#fff',
            background: '#42b72a',
            borderRadius: '6px',
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 16px',
            width: '302px',
            size: '20px',
            fontWeight: 'bold'
        }
    }
});

export default function LoginLeft() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const setHandlerInputEmail=(e)=>{
        e.preventDefault();
        console.log(e.target.value);
        setEmail(e.target.value);
    }
    const setHandlerInputPassword=(e)=>{
        e.preventDefault();
        console.log(e.target.value);
        setPassword(e.target.value);
    }
    return (
        <>
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
                        onChange={(e) => setHandlerInputEmail(e)}/>
                    <TextField id="password"
                        value={password}
                        placeholder="Password"
                        variant="outlined"
                        required
                        type="password"
                        onChange={(e) => setHandlerInputPassword(e)}/>
                </div>
                <ThemeProvider theme={customButton}>
                    <Button color="primary" variant="contained" size="large">Log In</Button>
                </ThemeProvider>
                <Link to='/forgottenPassword'>Forgot Password?</Link>
                <Divider flexItem/>
                {/* todo: onClick=> login with email and password */}
                <ThemeProvider theme={customButton}> 
                   <Link to='/signUp'style={{ textDecoration: 'none' }}><Button color="secondary" variant="contained" size="large">Create New Account</Button></Link> 
                </ThemeProvider>
            </form>
        </>
    )
}