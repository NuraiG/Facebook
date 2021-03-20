import React from 'react';
import {TextField } from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';
import BlueButton from './BlueButton';
import GreenButton from './GreenButton';


export default function Login() {
    return (
        <>
            <form className={
                    styles.login
                }
                autoComplete="off">
                <div className={
                    styles.input
                }>
                    <TextField id="outlined-basic" placeholder="Имейл или телефонен номер" variant="outlined"/>
                </div>
                <div className={
                    styles.input
                }>
                    <TextField id="outlined-basic" placeholder="Парола" variant="outlined"/>
                </div>
                <BlueButton>ВХОД</BlueButton>
                <Link to='/forgottenPassword'>Забравена парола ?</Link>
                <div className={
                    styles.line
                }></div>
                {/* import modal for register */}
                 <GreenButton onClick={()=>console.log('green')}>Създаване на нов профил</GreenButton>
            </form>
        </>
    )
}
