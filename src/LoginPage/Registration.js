// import React from 'react';
import React from "react";
import {TextField} from '@material-ui/core';
import GreenButton from './GreenButton';
import GenderSelect from './GenderSelect';
import DatePicker from './DatePicker';
import styles from './Registration.module.css';
export default function Registration() {
    return (
     
        <form className={
            styles.container1
        }>
            <div className={
                styles.header
            }>
                <h2>Регистрация</h2>
                <p>Бързо и лесно е.</p>
            </div>
            <div className={
                styles.container
            }>
                <div className={
                    styles.names
                }>
                    <TextField id="outlined-basic" placeholder="Собствено име" variant="outlined" required margin='normal' style={{ alignSelf: 'flex-start' }}/>
                    <TextField id="outlined-basic" placeholder="Фамилно име" variant="outlined" required margin='normal' style={{ alignSelf: 'flex-end' }}/>
                </div>
                <div className={
                    styles.additional
                }>
                    <TextField id="outlined-basic" placeholder="Имейл" variant="outlined" required/>
                    <TextField id="outlined-basic" placeholder="Нова парола" variant="outlined" required/>
                    <DatePicker></DatePicker>
                    <GenderSelect></GenderSelect>
                </div>
                <p>
                    By clicking Регистрация, you agree to our
                    <a href="https://www.facebook.com/legal/terms/update"> Terms</a>
                    . Learn how we collect, use and share your data in our
                    <a href="https://www.facebook.com/about/privacy/update"> Data Policy</a>
                    and how we use cookies and similar technology in our
                    <a href="https://www.facebook.com/policies/cookies/"> Cookies Policy</a>
                    . You may receive SMS Notifications from us and can opt out any time.
                </p>
                <GreenButton>РЕГИСТРАЦИЯ</GreenButton>
            </div>
        </form>
    )
}
