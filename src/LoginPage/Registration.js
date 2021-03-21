// import React from 'react';
import React from "react";
import {TextField} from '@material-ui/core';
import GreenButton from './GreenButton';
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core';
import styles from './Registration.module.css';
export default function Registration() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLatName] = React.useState('');
    const [bDate, setbDate] = React.useState('2003-03-21');
    const [gender, setGender] = React.useState('Other');
    return (
        <>
            <div className={
                styles.container1
            }>
                <h2>Регистрация</h2>
                <p>Бързо и лесно е.</p>
                <div className={
                    styles.names
                }>
                    <TextField id="firsName"
                        value={firstName}
                        placeholder="Собствено име"
                        variant="outlined"
                        required
                        style={
                            {alignSelf: 'flex-start'} 
                        }
                        />
                    <TextField placeholder="Фамилно име" id="lastName"
                        value={lastName}
                        variant="outlined"
                        required
                        style={
                            {alignSelf: 'flex-end'}
                        }/>
                </div>
                <div className={
                    styles.additional
                }>
                    <TextField id="email"
                        value={email}
                        placeholder="Имейл"
                        variant="outlined"
                        required/>
                    <TextField id="password"
                        value={password}
                        placeholder="Нова парола"
                        variant="outlined"
                        required/> 
                    <TextField label="Дата на раждане" id="date"
                        value={bDate}
                        type="date"
                        // defaultValue="2003-03-21"
                        InputLabelProps={
                            {shrink: true}
                        }/> 
                    <FormControl component="fieldset">
                        <FormLabel component="legend"
                            style={
                                {textAlign: 'start'}
                        }>Пол</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" id="gender"
                            value={gender}
                            // onChange={(ev)=>console.log(ev.target.value)}
                            row
                        >
                            <FormControlLabel value="Female"
                                control={
                                    <Radio
                                color="default"/>
                                }
                                labelPlacement="start"
                                label="Жена"/>
                            <FormControlLabel value="Male"
                                control={
                                    <Radio
                                color="default"/>
                                }
                                labelPlacement="start"
                                label="Мъж"/>
                            <FormControlLabel value="Other"
                                control={
                                    <Radio
                                color="default"/>
                                }
                                labelPlacement="start"
                                label="По избор"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <p>
                    By clicking Регистрация, you agree to our
                    <a href="https://www.facebook.com/legal/terms/update">
                        Terms</a>
                    . Learn how we collect, use and share your data in our
                    <a href="https://www.facebook.com/about/privacy/update">
                        Data Policy</a>
                    and how we use cookies and similar technology in our
                    <a href="https://www.facebook.com/policies/cookies/">
                        Cookies Policy</a>
                    . You may receive SMS Notifications from us and can opt out any time.
                </p>
                <GreenButton>РЕГИСТРАЦИЯ</GreenButton>
            </div>
        </>
    )
}
