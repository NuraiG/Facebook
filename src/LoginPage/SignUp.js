import React from "react";
import {TextField} from '@material-ui/core';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button
} from '@material-ui/core';
import styles from './SignUp.module.css';
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
            contrastText: '#fff'
        }
    }
});
export default function Registration() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [bDate, setbDate] = React.useState('2003-03-21');
    const [gender, setGender] = React.useState('Other');
    // todo: validate email && validePassword name..
    // onClick Sign Up

    const setHandlerGender = (e) => {
        setGender(e.target.value);
    }
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
            default:;
        }
    }
    return (
        <>
            <div className={
                styles.signUp
            }>
                <div className={
                    styles.container1
                }>
                    <h2>Sign Up</h2>
                    <p>It’s quick and easy.</p>
                    <div className={
                        styles.names
                    }>
                        <TextField id="firstName"
                            value={firstName}
                            placeholder="First name"
                            variant="outlined"
                            required
                            style={
                                {alignSelf: 'flex-start'}
                            }
                            onChange={
                                (e) => onChangeHandler(e)
                            }/>
                        <TextField placeholder="Last name" id="lastName"
                            value={lastName}
                            variant="outlined"
                            required
                            style={
                                {alignSelf: 'flex-end'}
                            }
                            onChange={
                                (e) => onChangeHandler(e)
                            }/>
                    </div>
                    <div className={
                        styles.additional
                    }>
                        <TextField id="email"
                            value={email}
                            placeholder="Email"
                            variant="outlined"
                            required
                            onChange={
                                (e) => onChangeHandler(e)
                            }/>
                        <TextField id="password"
                            value={password}
                            placeholder="New password"
                            variant="outlined"
                            required
                            type="password"
                            onChange={
                                (e) => onChangeHandler(e)
                            }/>
                        <TextField label="Birthday" id="date"
                            value={bDate}
                            type="date"
                            InputLabelProps={
                                {shrink: true}
                            }
                            onChange={
                                (e) => onChangeHandler(e)
                            }/>
                        <FormControl component="fieldset">
                            <FormLabel component="legend"
                                style={
                                    {textAlign: 'start'}
                            }>Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" id="gender"
                                value={gender}
                                onChange={
                                    (e) => setHandlerGender(e)
                                }
                                row>
                                <FormControlLabel value="Female"
                                    control={
                                        <Radio
                                    color="default"/>
                                    }
                                    labelPlacement="start"
                                    label="Female"/>
                                <FormControlLabel value="Male"
                                    control={
                                        <Radio
                                    color="default"/>
                                    }
                                    labelPlacement="start"
                                    label="Male"/>
                                <FormControlLabel value="Other"
                                    control={
                                        <Radio
                                    color="default"/>
                                    }
                                    labelPlacement="start"
                                    label="Custom"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <p>
                        By clicking Регистрация, you agree to our
                        <a href="https://www.facebook.com/legal/terms/update">
                            Terms
                        </a>
                        . Learn how we collect, use and share your data in our
                        <a href="https://www.facebook.com/about/privacy/update">
                            Data Policy
                        </a>
                        and how we use cookies and similar technology in our
                        <a href="https://www.facebook.com/policies/cookies/">
                            Cookies Policy
                        </a>
                        . You may receive SMS Notifications from us and can opt out any time.
                    </p>
                    {/* todo: sign up on click */}
                    <ThemeProvider theme={customButton}>
                        <Button color="secondary" variant="contained" size="large">Sign Up</Button>
                    </ThemeProvider>
                </div>
            </div>
        </>
    )
}
