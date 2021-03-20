import React from 'react';
import {TextField, Divider} from '@material-ui/core';
import styles from './Login.module.css';
import GreenButton from './GreenButton';

export default function Registration() {
    return (
        <div>
            <h1>Регистрация</h1>
            <p>Бързо и лесно е.</p>
            <Divider/>
            <TextField id="outlined-basic" placeholder="Собствено име" variant="outlined"/>
            <TextField id="outlined-basic" placeholder="Фамилно име" variant="outlined"/>
            <TextField id="outlined-basic" placeholder="Имейл" variant="outlined"/>
            <TextField id="outlined-basic" placeholder="Нова парола" variant="outlined"/>
            <GreenButton>РЕГИСТРАЦИЯ</GreenButton>
        </div>
    )
}
